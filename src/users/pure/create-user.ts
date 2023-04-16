import { pipe } from '@effect/data/Function';
import * as Effect from '@effect/io/Effect';
import { Repository } from 'typeorm';
import { CannotCreateException } from '../../exceptions';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../tags';

export const createUser = (input: UserEntity) => {
  return pipe(
    Effect.Do(),
    Effect.bind('repo', () => UsersRepository),
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
