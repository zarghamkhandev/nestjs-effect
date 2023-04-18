import { Effect, pipe } from '../../prelude';
import { Repository } from 'typeorm';
import { CommonException } from '../../exceptions';
import { UserEntity } from '../entities/user.entity';
import { UsersRepositoryTag } from '../tags';

export const getUsersEffect = pipe(UsersRepositoryTag, Effect.flatMap(tryFindUsers));

export function tryFindUsers(repo: Repository<UserEntity>) {
  return Effect.tryCatchPromise(
    () => repo.find(),
    (error) => new CommonException('Can not get users', error),
  );
}
