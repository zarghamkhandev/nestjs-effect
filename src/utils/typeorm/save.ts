import { SaveOptions } from 'typeorm';
import { Effect, pipe } from '../../prelude';
import { EntityManagerTag } from './manager';

export function save<Entity>(entity: Entity, options?: SaveOptions) {
  return pipe(
    EntityManagerTag,
    Effect.flatMap((manager) =>
      Effect.tryPromise(() => manager.save(entity, options)),
    ),
  );
}
