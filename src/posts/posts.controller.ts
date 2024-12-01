import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  async create(@Body() post: { userId: number; title: string; content: string }) {
    return this.postsService.createPost(post.userId, post.title, post.content);
  }

  @Get()
  async findAll() {
    return this.postsService.getPosts();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() post: { userId: number; title: string; content: string }) {
    return this.postsService.updatePost(id, post.userId, post.title, post.content);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Body() user: { userId: number }) {
    return this.postsService.deletePost(id, user.userId);
  }
}
