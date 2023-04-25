import { find } from '../../utils';
import { UserEntity } from '../entities/user.entity';

export const getUsers = find(UserEntity);
