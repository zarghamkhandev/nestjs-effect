import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { UsersNotFoundException } from '../errors';
import { UsersRepositoryTag } from '../tags';

export const getUsersEffect = pipe(
  UsersRepositoryTag,
  Effect.flatMap(({ find }) => {
    return Effect.tryCatchPromise(
      () => find(),
      () => new UsersNotFoundException(),
    );
  }),
);
