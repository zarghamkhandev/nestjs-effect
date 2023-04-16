import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { CommonException } from '../../shared';
import { UsersRepository } from '../tags';

export const getUsersEffect = pipe(
  UsersRepository,
  Effect.flatMap((repo) => {
    return Effect.tryCatchPromise(
      () => repo.find(),
      (error) => new CommonException('Can not get users', error),
    );
  }),
);
