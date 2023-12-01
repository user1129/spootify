import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDTO } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  @Post('/create')
  createTrack(@UploadedFiles() files, @Body() dto: CreateTrackDTO) {
    const { picture, audio } = files;
    return this.trackService.createTrack(dto, picture[0], audio[0]);
  }

  @Get('/getAll')
  getAllTracks(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAllTracks(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @Get('/getOne/:id')
  getOneTrack(@Param('id') id: ObjectId) {
    return this.trackService.getOneTrack(id);
  }

  @Delete('/delete/:id')
  deleteTrack(@Param('id') id: ObjectId) {
    return this.trackService.deleteTrack(id);
  }

  @Post('/addComment')
  addComment(@Body() dto: CreateCommentDTO) {
    return this.trackService.addComment(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
