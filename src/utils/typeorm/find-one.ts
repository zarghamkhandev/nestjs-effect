import { ObjectLiteral, EntityTarget, FindOneOptions } from 'typeorm';
import { Effect, pipe } from '../../prelude';
import { EntityManager } from './manager';

export function findOne<Entity extends ObjectLiteral>(
  entityClass: EntityTarget<Entity>,
  options: FindOneOptions<Entity>,
) {
  return pipe(
    EntityManager,
    Effect.flatMap((manager) =>
      Effect.promise(() => manager.findOne(entityClass, options)),
    ),
  );
}
