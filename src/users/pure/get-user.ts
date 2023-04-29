import { EffectORM } from '../../utils';
import { UserEntity } from '../entities/user.entity';

export const getUser = (id: string) =>
  EffectORM.findOne(UserEntity, { where: { id } });
