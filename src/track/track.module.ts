import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Track, TrackModel } from './models/track.model';
import { CommentModel, Comment } from './models/comment.model';
import { FileModule } from 'src/files/file.module';
import { FileService } from 'src/files/file.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FileService],
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackModel }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentModel }]),
    FileModule,
  ],
})
export class TrackModule {}
