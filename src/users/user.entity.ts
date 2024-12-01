import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post, Comment } from '../posts/posts.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
