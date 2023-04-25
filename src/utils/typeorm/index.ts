import { DataSourceOptions, DataSource } from 'typeorm';
import { EntityClassOrSchema } from './entity-class-or-schema';
import { Context, Layer } from '../../prelude';
import { getService } from '../runtime';

export function createDataSource(
  options: DataSourceOptions,
  entities: EntityClassOrSchema[],
): DataSource {
  return new DataSource({
    ...options,
    entities,
  });
}

export const DataSourceTag = Context.Tag<DataSource>();

export const DataSourceLive = Layer.effect(
  DataSourceTag,
  getService(DataSource),
);
