import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import * as Context from '@effect/data/Context';

export const UsersRepositoryTag = Context.Tag<Repository<UserEntity>>();
