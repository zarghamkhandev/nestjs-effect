import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnotherService, AnotherServiceTag } from './another.service';
import { UserEntity } from './entities/user.entity';
import { UsersRepositoryTag } from './tags';
import { UseRuntime } from '../utils/use-runtime';

@Injectable()
export class UsersRuntime extends UseRuntime<[UsersRepositoryTag, AnotherServiceTag]> {
  constructor(
    @InjectRepository(UserEntity)
    usersRepository: Repository<UserEntity>,
    private anotherService: AnotherService,
  ) {
    super([
      [UsersRepositoryTag, usersRepository],
      [AnotherServiceTag, anotherService],
    ]);
  }
}
