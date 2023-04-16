import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { UsersRepositoryTag } from '../tags';

export const getUsersEffect = pipe(
  UsersRepositoryTag,
  Effect.flatMap(({ find }) => {
    return Effect.tryPromise(() => find());
  }),
  Effect.catchAllCause(() => Effect.succeed([])),
);
