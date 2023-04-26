import { Effect, Exit, Scope, pipe } from '../../prelude';
import { EntityManager } from 'typeorm';
import { EntityManagerTag } from './manager';

export function transaction<E, A>(self: Effect.Effect<EntityManager, E, A>) {
  const acquire = pipe(
    EntityManagerTag,
    Effect.flatMap((manager) =>
      Effect.tryPromise(() =>
        manager.transaction(async (transactionalManager) =>
          Effect.runPromise(
            pipe(
              self,
              Effect.provideService(EntityManagerTag, transactionalManager),
            ),
          ),
        ),
      ),
    ),
  );

  return Effect.acquireUseRelease(
    Scope.make(),
    () => acquire,
    (scope) => {
      return Scope.close(scope, Exit.unit());
    },
  );
}
