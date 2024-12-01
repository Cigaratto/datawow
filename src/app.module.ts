import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.mdhjstrjxnqehpzwvowq',
      password: 'oYp2nqc1R2dnzjAH',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
