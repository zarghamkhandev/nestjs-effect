import { EffectORM } from '../../utils';
import { UserEntity } from '../entities/user.entity';

export const findAll = EffectORM.find(UserEntity);

export const getUsers = EffectORM.transaction(findAll);
