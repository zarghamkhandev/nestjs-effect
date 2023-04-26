import { DeepPartial, EntityTarget } from 'typeorm';
import { Effect, pipe } from '../../prelude';
import { EntityManagerTag } from './manager';

export function create<Entity>(
  entityClass: EntityTarget<Entity>,
  plainObject?: DeepPartial<Entity>,
) {
  return pipe(
    EntityManagerTag,
    Effect.map((manager) => manager.create(entityClass, plainObject)),
  );
}
