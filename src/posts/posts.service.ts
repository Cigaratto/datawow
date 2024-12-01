import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/posts.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async createPost(userId: number, title: string, content: string): Promise<Post> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const post = this.postsRepository.create({ title, content, user });
    return this.postsRepository.save(post);
  }

  async getPosts(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user', 'comments'] });
  }
  async updatePost(postId: number, userId: number, title: string, content: string): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id: postId }, relations: ['user'] });
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.user.id !== userId) {
      throw new Error('You can only edit your own posts');
    }
    post.title = title;
    post.content = content;
    return this.postsRepository.save(post);
  }
  async deletePost(postId: number, userId: number): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id: postId }, relations: ['user'] });
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.user.id !== userId) {
      throw new Error('You can only delete your own posts');
    }
    await this.postsRepository.delete(postId);
  }
}
