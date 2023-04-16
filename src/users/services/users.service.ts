import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getUsersEffect } from '../pure';
import { UsersRepository } from '../tags';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAllUsers() {
    return pipe(
      getUsersEffect,
      Effect.provideService(UsersRepository, this.usersRepository),
    );
  }
}
