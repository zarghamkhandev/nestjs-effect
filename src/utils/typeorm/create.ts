import { DeepPartial, EntityTarget } from 'typeorm';
import { Effect, pipe } from '../../prelude';
import { EntityManager } from './manager';

export function create<Entity>(
  entityClass: EntityTarget<Entity>,
  plainObject?: DeepPartial<Entity>,
) {
  return pipe(
    EntityManager,
    Effect.map((manager) => manager.create(entityClass, plainObject)),
  );
}
