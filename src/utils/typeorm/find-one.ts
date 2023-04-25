import { ObjectLiteral, EntityTarget, FindOneOptions } from 'typeorm';
import { Effect } from '../../prelude';
import { DataSourceTag } from './data-source';

export function findOne<Entity extends ObjectLiteral>(
  entityClass: EntityTarget<Entity>,
  options: FindOneOptions<Entity>,
) {
  return Effect.flatMap(DataSourceTag, (dataSource) =>
    Effect.promise(() => dataSource.manager.findOne(entityClass, options)),
  );
}
