import { DeepPartial, EntityTarget } from 'typeorm';
import { Effect } from '../../prelude';
import { DataSourceTag } from './data-source';

export function create<Entity>(
  entityClass: EntityTarget<Entity>,
  plainObject?: DeepPartial<Entity>,
) {
  return Effect.map(DataSourceTag, (dataSource) =>
    dataSource.manager.create(entityClass, plainObject),
  );
}
