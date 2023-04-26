import { ObjectLiteral, EntityTarget, FindManyOptions } from 'typeorm';
import { Effect, pipe } from '../../prelude';
import { EntityManagerTag } from './manager';

export function find<Entity extends ObjectLiteral>(
  entityClass: EntityTarget<Entity>,
  options?: FindManyOptions<Entity>,
) {
  return pipe(
    EntityManagerTag,
    Effect.flatMap((manager) =>
      Effect.promise(() => manager.find(entityClass, options)),
    ),
  );
}
