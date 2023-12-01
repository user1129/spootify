import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './models/track.model';
import { Model, ObjectId } from 'mongoose';
import { CommentDocument, Comment } from './models/comment.model';
import { CreateTrackDTO } from './dto/create-track.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FileService, FileType } from 'src/files/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private track: Model<TrackDocument>,
    @InjectModel(Comment.name) private comment: Model<CommentDocument>,
    private readonly fileService: FileService,
  ) {}

  async createTrack(dto: CreateTrackDTO, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const track = await this.track.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  async getAllTracks(count: number, offset: number): Promise<Track[]> {
    const tracks = await this.track.find().skip(offset).limit(count);
    return tracks;
  }

  async getOneTrack(id: ObjectId): Promise<Track> {
    const track = (await this.track.findById(id)).populate('comments');
    return track;
  }

  async deleteTrack(id: ObjectId) {
    const track = await this.track.findByIdAndDelete(id);
    return track.value;
  }

  async addComment(dto: CreateCommentDTO): Promise<Comment> {
    const track = await this.track.findById(dto.trackId);
    const comment = await this.comment.create({ ...dto });
    track.comments.push(comment.id);
    await track.save();
    return comment;
  }

  async listen(id: ObjectId) {
    const track = await this.track.findByIdAndUpdate(id);
    track.listens += 1;
    await track.save();
  }
  async search(query: string): Promise<Track[]> {
    const tracks = await this.track.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
