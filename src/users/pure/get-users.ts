import { find, transaction } from '../../utils';
import { UserEntity } from '../entities/user.entity';

export const findAll = find(UserEntity);

export const getUsers = transaction(findAll);
