import { Injectable } from '@nestjs/common';
import { UsersRepositoryLive } from './tags';
import { RuntimeBase } from '../utils/runtime';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService extends RuntimeBase<Repository<UserEntity>> {
  override layer = UsersRepositoryLive;
}
