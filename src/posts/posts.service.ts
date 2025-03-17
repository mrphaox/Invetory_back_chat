import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { CreatePostDto } from './DTO/create-post.dto';
import { UpdatePostDto } from './DTO/update-post.dto';


@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return new this.postModel(createPostDto).save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException('Publicación no encontrada');
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
    if (!updatedPost) throw new NotFoundException('Publicación no encontrada');
    return updatedPost;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedPost = await this.postModel.findByIdAndDelete(id);
    if (!deletedPost) throw new NotFoundException('Publicación no encontrada');
    return { message: 'Publicación eliminada' };
  }

  async likePost(id: string, userId: string): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Publicación no encontrada');

    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    return post.save();
  }
}
