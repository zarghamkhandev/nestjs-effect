import { Injectable } from '@nestjs/common';
import { UsersRepositoryLive } from './tags';
import { RuntimeBase } from '../utils/runtime';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Layer, pipe } from '../prelude';
import { ModuleRef } from '@nestjs/core';

type Layers = Layer.Layer<ModuleRef, never, Repository<UserEntity>>;

const layers: Layers = pipe(UsersRepositoryLive);

@Injectable()
export class UsersService extends RuntimeBase<Repository<UserEntity>> {
  override layer = layers;
}
