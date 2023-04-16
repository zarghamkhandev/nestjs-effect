import { pipe } from '@effect-ts/core/Function';
import * as Effect from '@effect/io/Effect';
import { UsersDAO } from '../dao/users.dao';
import { UserNotFoundException, UsersNotFoundException } from '../errors';

export class UsersEffect {
  constructor(private readonly usersDAO: UsersDAO) {}

  findAllUsersEffect = pipe(
    Effect.tryCatchPromise(
      () => this.usersDAO.findAll(),
      () => new UsersNotFoundException(),
    ),
  );

  findOneUserEffect = (id: string) =>
    pipe(
      Effect.tryCatchPromise(
        () => this.usersDAO.findOne(id),
        () => new UserNotFoundException(id),
      ),
    );
}
