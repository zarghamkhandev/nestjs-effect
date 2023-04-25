import { Effect, pipe } from '../../prelude';
import { create, save } from '../../utils';
import { UserEntity } from '../entities/user.entity';

export const createUser = (user: UserEntity) =>
  pipe(create(UserEntity, user), Effect.flatMap(save));
