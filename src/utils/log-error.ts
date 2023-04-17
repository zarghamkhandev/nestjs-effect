import { Effect } from '../prelude';
import { AbstractException } from '../exceptions/abstract.exception';

export const logErrorMessage = Effect.catchAll((error: AbstractException) => {
  console.log(error.message);
  return Effect.succeed(null);
});

export const logErrorLabel = Effect.catchAll((error: AbstractException) => {
  console.log(error._label);
  return Effect.succeed(null);
});

export const logError = Effect.catchAll((error: AbstractException) => {
  console.log(error);
  return Effect.succeed(null);
});
