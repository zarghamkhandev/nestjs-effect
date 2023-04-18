import { Repository } from 'typeorm';
import { CannotCreateException } from '../../exceptions';
import { UserEntity } from '../entities/user.entity';
import { UsersRepositoryTag } from '../tags';
import { Effect, pipe } from '../../prelude';

export const createUser = (input: UserEntity) => {
  return pipe(
    Effect.Do(),
    Effect.bind('repo', () => UsersRepositoryTag),
    Effect.bind('entity', ({ repo }) => createEntity(input)(repo)),
    Effect.flatMap(({ entity, repo }) => createUserPromise(repo)(entity)),
    Effect.catchAll(throwException(input)),
  );
};

export const createUserPromise = (repo: Repository<UserEntity>) => (user: UserEntity) =>
  Effect.try(() => repo.create(user));

export const createEntity = (user: UserEntity) => (repo: Repository<UserEntity>) => {
  return Effect.tryPromise(() => repo.save(user));
};

export const throwException = (user: UserEntity) => (err: unknown) => Effect.fail(new CannotCreateException(user, err));
