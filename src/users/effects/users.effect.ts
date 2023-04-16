import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UsersRepositoryTag } from '../tags';
import { getUsersEffect } from './get-users';

@Injectable()
export class UsersEffect {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAllUsers() {
    return pipe(
      getUsersEffect,
      Effect.provideService(UsersRepositoryTag, this.usersRepository),
    );
  }
}
