import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('post/:postId')
  async findAllByPost(@Param('postId') postId: string) {
    return this.commentsService.findAllByPost(postId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findById(id);
  }

  @Put()
  async update(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto.id, updateCommentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commentsService.delete(id);
  }
}
