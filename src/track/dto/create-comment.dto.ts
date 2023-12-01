import { ObjectId } from 'mongoose';

export class CreateCommentDTO {
  readonly username: string;
  readonly comment: string;
  readonly trackId: ObjectId;
}
