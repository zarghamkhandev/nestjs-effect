import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CannotCreateException } from '../errors';
import { UsersRepository } from '../tags';

export const createUserEffect = (
  user: UserEntity,
): Effect.Effect<Repository<UserEntity>, CannotCreateException, UserEntity> =>
  pipe(
    UsersRepository,
    Effect.flatMap((repository) =>
      Effect.tryCatchPromise(
        () => createUser(user)(repository),
        (reason) => new CannotCreateException(user, reason),
      ),
    ),
  );

export const createUser =
  (input: UserEntity) =>
  (repository: Repository<UserEntity>): Promise<UserEntity> => {
    const user = repository.create(input);
    return repository.save(user);
  };
