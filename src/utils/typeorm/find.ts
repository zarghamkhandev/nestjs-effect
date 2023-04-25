import { ObjectLiteral, EntityTarget, FindManyOptions } from 'typeorm';
import { Effect } from '../../prelude';
import { DataSourceTag } from './data-source';

export function find<Entity extends ObjectLiteral>(
  entityClass: EntityTarget<Entity>,
  options?: FindManyOptions<Entity>,
) {
  return Effect.flatMap(DataSourceTag, (dataSource) =>
    Effect.promise(() => dataSource.manager.find(entityClass, options)),
  );
}
