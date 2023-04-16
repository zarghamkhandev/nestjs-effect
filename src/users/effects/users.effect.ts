import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { Injectable } from '@nestjs/common';
import { UsersDAO, UsersDAOTag } from '../dao/users.dao';
import { UserNotFoundException } from '../errors';
import { findAllUsersEffect } from './find-all-users.effect';

@Injectable()
export class UsersEffect {
  constructor(private readonly usersDAO: UsersDAO) {}

  findAllUsers() {
    return pipe(
      findAllUsersEffect,
      Effect.provideService(UsersDAOTag, this.usersDAO),
    );
  }

  findOneUser = (id: string) =>
    pipe(
      Effect.tryCatchPromise(
        () => this.usersDAO.findOne(id),
        () => new UserNotFoundException(id),
      ),
    );
}
