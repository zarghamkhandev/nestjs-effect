import { SaveOptions } from 'typeorm';
import { Effect } from '../../prelude';
import { DataSourceTag } from './data-source';

export function save<Entity>(entity: Entity, options?: SaveOptions) {
  return Effect.flatMap(DataSourceTag, (dataSource) =>
    Effect.tryPromise(() => dataSource.manager.save(entity, options)),
  );
}
