import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Context, Layer } from '../../prelude';
import { getRepository } from '../../utils/runtime';

export const UsersRepository = Context.Tag<Repository<UserEntity>>();

export const UsersRepositoryLive = Layer.effect(UsersRepository, getRepository(UserEntity));
