import * as Effect from '@effect/io/Effect';
import { CommonException } from '../shared/common.exception';

export const logErrorMessage = Effect.catchAll((error: CommonException) => {
  console.log(error.message);
  return Effect.succeed(null);
});

export const logErrorLabel = Effect.catchAll((error: CommonException) => {
  console.log(error._label);
  return Effect.succeed(null);
});

export const logError = Effect.catchAll((error: CommonException) => {
  console.log(error);
  return Effect.succeed(null);
});
