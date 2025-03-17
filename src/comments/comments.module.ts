import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostComment, PostCommentSchema } from './schema/comment.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: PostComment.name, schema: PostCommentSchema }])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
