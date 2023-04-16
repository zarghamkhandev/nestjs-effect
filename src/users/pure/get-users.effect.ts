import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../tags';

export const getUsersEffect = pipe(
  UsersRepository,
  Effect.flatMap(({ find }) => {
    return Effect.tryPromise(() => find());
  }),
  Effect.catchAllCause(() => Effect.succeed<UserEntity[]>([])),
);
