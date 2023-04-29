import { Effect, pipe } from '../../prelude';
import { EffectORM } from '../../utils';
import { UserEntity } from '../entities/user.entity';

export const createUser = (user: UserEntity) =>
  pipe(EffectORM.create(UserEntity, user), Effect.flatMap(EffectORM.save));
