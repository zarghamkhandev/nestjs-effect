import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CannotCreateException } from '../errors';
import { UsersRepository } from '../tags';

export const createUserEffect = (input: Partial<UserEntity>) =>
  pipe(
    UsersRepository,
    Effect.flatMap((repository) =>
      Effect.tryCatchPromise(
        () => createUser(input)(repository),
        (reason) => new CannotCreateException(input, reason),
      ),
    ),
  );

export const createUser =
  (input: Partial<UserEntity>) =>
  (repository: Repository<UserEntity>): Promise<UserEntity> => {
    const user = repository.create(input);
    return repository.save(user);
  };
