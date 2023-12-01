import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Track } from './track.model';
export type CommentDocument = Comment & Document;
@Schema()
export class Comment {
  @Prop()
  username: string;
  @Prop()
  text: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  track: Track;
}

export const CommentModel = SchemaFactory.createForClass(Comment);
