import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { Repository } from 'typeorm';
import { CannotCreateException } from '../../exceptions';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../tags';

export const createUserEffect = (user: UserEntity) => pipe(UsersRepository, Effect.flatMap(tryCreateUser(user)));

export const tryCreateUser = (user: UserEntity) => (repository: Repository<UserEntity>) =>
  Effect.tryCatchPromise(
    () => createUser(user)(repository),
    (reason) => new CannotCreateException(user, reason),
  );

export const createUser =
  (input: UserEntity) =>
  (repository: Repository<UserEntity>): Promise<UserEntity> => {
    const user = repository.create(input);
    return repository.save(user);
  };
