import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Context } from '../../prelude';

export const UsersRepositoryTag = Context.Tag<Repository<UserEntity>>();
export type UsersRepositoryTag = typeof UsersRepositoryTag;
