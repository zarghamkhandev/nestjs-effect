import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { Repository } from 'typeorm';
import { CommonException } from '../../exceptions';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../tags';

export const getUsersEffect: Effect.Effect<Repository<UserEntity>, CommonException, UserEntity[]> = pipe(
  UsersRepository,
  Effect.flatMap((repo) => {
    return Effect.tryCatchPromise(
      () => repo.find(),
      (error) => new CommonException('Can not get users', error),
    );
  }),
);
