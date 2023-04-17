import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Context } from '../../prelude';

export const UsersRepository = Context.Tag<Repository<UserEntity>>();
