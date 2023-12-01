import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './files/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TrackModule,
    MongooseModule.forRoot(
      'mongodb+srv://erronblackx9:root@local.7y7m4nd.mongodb.net/?retryWrites=true&w=majority',
    ),
    FileModule,
  ],
})
export class AppModule {}
