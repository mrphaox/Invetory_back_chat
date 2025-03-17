import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostComment, PostCommentDocument } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';


@Injectable()
export class CommentsService {
  constructor(@InjectModel(PostComment.name) private commentModel: Model<PostCommentDocument>) {}

  async create(createCommentDto: CreateCommentDto): Promise<PostComment> {
    return new this.commentModel(createCommentDto).save();
  }

  async findAllByPost(postId: string): Promise<PostComment[]> {
    return this.commentModel.find({ postId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<PostComment> {
    const comment = await this.commentModel.findById(id).exec();
    if (!comment) throw new NotFoundException('Comentario no encontrado');
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<PostComment> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true });
    if (!updatedComment) throw new NotFoundException('Comentario no encontrado');
    return updatedComment;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedComment = await this.commentModel.findByIdAndDelete(id);
    if (!deletedComment) throw new NotFoundException('Comentario no encontrado');
    return { message: 'Comentario eliminado' };
  }
}
