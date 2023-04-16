import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { UsersDAO } from '../dao/users.dao';
import { UserNotFoundException, UsersNotFoundException } from '../errors';

export class UsersEffect {
  constructor(private readonly usersDAO: UsersDAO) {}

  findAllUsers = Effect.tryCatchPromise(
    () => this.usersDAO.findAll(),
    () => new UsersNotFoundException(),
  );

  findOneUser = (id: string) =>
    pipe(
      Effect.tryCatchPromise(
        () => this.usersDAO.findOne(id),
        () => new UserNotFoundException(id),
      ),
    );
}
