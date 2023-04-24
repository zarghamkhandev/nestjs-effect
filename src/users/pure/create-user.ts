import { CannotCreateException } from '../../exceptions';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../tags';
import { Effect, pipe } from '../../prelude';

export const createUser = (user: UserEntity) => {
  return pipe(
    createEntity(user),
    Effect.flatMap(saveEntity),
    Effect.catchAll(throwException(user)),
  );
};

export const saveEntity = (user: UserEntity) =>
  Effect.flatMap(UsersRepository, (repo) =>
    Effect.tryPromise(() => repo.save(user)),
  );

export const createEntity = (user: UserEntity) =>
  Effect.map(UsersRepository, (repo) => repo.create(user));

export const throwException = (user: UserEntity) => (err: unknown) =>
  Effect.fail(new CannotCreateException(user, err));
