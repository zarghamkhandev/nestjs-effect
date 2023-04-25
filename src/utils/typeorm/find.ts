import { ObjectLiteral, EntityTarget, FindManyOptions } from 'typeorm';
import { Effect, pipe } from '../../prelude';
import { EntityManager } from './manager';

export function find<Entity extends ObjectLiteral>(
  entityClass: EntityTarget<Entity>,
  options?: FindManyOptions<Entity>,
) {
  return pipe(
    EntityManager,
    Effect.flatMap((manager) =>
      Effect.promise(() => manager.find(entityClass, options)),
    ),
  );
}
