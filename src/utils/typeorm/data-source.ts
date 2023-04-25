import { DataSource } from 'typeorm';
import { Context, Layer } from '../../prelude';
import { getService } from '../runtime';

export const DataSourceTag = Context.Tag<DataSource>();

export const DataSourceLive = Layer.effect(
  DataSourceTag,
  getService(DataSource),
);
