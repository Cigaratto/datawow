import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string): Promise<User> {
    const user = this.usersRepository.create({ username });
    return this.usersRepository.save(user);
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }
}
