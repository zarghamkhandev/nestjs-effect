import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Layer, pipe } from '../prelude';
import { DataSourceLive, RuntimeBase } from '../utils';

type Layers = Layer.Layer<ModuleRef, never, DataSource>;

const layers: Layers = pipe(DataSourceLive);

@Injectable()
export class UsersService extends RuntimeBase<DataSource> {
  override layer = layers;
}
