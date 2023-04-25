import { findOne } from '../../utils';
import { UserEntity } from '../entities/user.entity';

export const getUser = (id: string) => findOne(UserEntity, { where: { id } });
