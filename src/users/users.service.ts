import { Injectable } from '@nestjs/common';
import { UsersRepositoryLive } from './tags';
import { RunTimeBase } from '../utils/runtime';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService extends RunTimeBase<Repository<UserEntity>> {
  override layer = UsersRepositoryLive;
}
