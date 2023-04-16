import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import * as Context from '@effect/data/Context';

export const UsersRepository = Context.Tag<Repository<UserEntity>>();
