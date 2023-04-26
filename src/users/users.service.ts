import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DataSource, EntityManager } from 'typeorm';
import { Layer, pipe } from '../prelude';
import { DataSourceLive, EntityManagerLive, RuntimeBase } from '../utils';

type Layers = Layer.Layer<ModuleRef, never, DataSource | EntityManager>;

const layers: Layers = pipe(
  DataSourceLive,
  Layer.provideMerge(EntityManagerLive),
);

@Injectable()
export class UsersService extends RuntimeBase<DataSource | EntityManager> {
  override layer = layers;
}
