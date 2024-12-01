import { 
  Controller, 
  Post, 
  Body, 
  HttpException, 
  HttpStatus,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() user: { username: string }) {
    try {
      if (!user.username) {
        throw new BadRequestException('Username is required');
      }

      // Check if user already exists
      const existingUser = await this.usersService.findOneByUsername(user.username);
      if (existingUser) {
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      }

      return await this.usersService.create(user.username);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: { username: string }) {
    try {
      if (!loginDto.username) {
        throw new BadRequestException('Username is required');
      }

      const user = await this.usersService.findOneByUsername(loginDto.username);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Login failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
