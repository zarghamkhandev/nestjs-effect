import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { UsersDAOTag } from '../dao/users.dao';
import { UsersNotFoundException } from '../errors';

export const findAllUsersEffect = pipe(
  UsersDAOTag,
  Effect.flatMap(({ findAll }) => {
    return Effect.tryCatchPromise(
      () => findAll(),
      () => new UsersNotFoundException(),
    );
  }),
);
