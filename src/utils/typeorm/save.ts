import { SaveOptions } from 'typeorm';
import { Effect, pipe } from '../../prelude';
import { EntityManager } from './manager';

export function save<Entity>(entity: Entity, options?: SaveOptions) {
  return pipe(
    EntityManager,
    Effect.flatMap((manager) =>
      Effect.tryPromise(() => manager.save(entity, options)),
    ),
  );
}
