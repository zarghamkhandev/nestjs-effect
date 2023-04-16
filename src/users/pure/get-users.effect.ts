import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { UsersRepository } from '../tags';

export const getUsersEffect = pipe(
  UsersRepository,
  Effect.flatMap(({ find }) => {
    return Effect.tryPromise(() => find());
  }),
  Effect.catchAllCause(() => Effect.succeed([])),
);
