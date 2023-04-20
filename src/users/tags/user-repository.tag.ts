import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Context, Effect, Layer } from '../../prelude';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ModuleRefTag } from '../../utils/runtime';

export const UsersRepository = Context.Tag<Repository<UserEntity>>();

export const UsersRepositoryLive = Layer.effect(
  UsersRepository,
  Effect.map(ModuleRefTag, (_) => _.get(getRepositoryToken(UserEntity), { strict: false })),
);
