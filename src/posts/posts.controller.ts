import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './DTO/create-post.dto';
import { UpdatePostDto } from './DTO/update-post.dto';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Put()
  async update(@Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(updatePostDto.id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }

  @Post(':id/like/:userId')
  async likePost(@Param('id') id: string, @Param('userId') userId: string) {
    return this.postsService.likePost(id, userId);
  }
}
