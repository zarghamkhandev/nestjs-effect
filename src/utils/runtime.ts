import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Context, Effect, Exit, Layer, Runtime, Scope, pipe } from '../prelude';
import { ModuleRef } from '@nestjs/core';

export const ModuleRefTag = Context.Tag<ModuleRef>();

@Injectable()
export abstract class RunTimeBase<A> implements OnModuleInit, OnModuleDestroy {
  constructor(private moduleRef: ModuleRef) { }
  abstract layer: Layer.Layer<ModuleRef, never, A>;
  protected rt: {
    runtime: Runtime.Runtime<A>;
    clean: Effect.Effect<never, never, void>;
  };

  // TODO: consider a global runtime, instead of one per module
  async onModuleInit() {
    this.rt = await Effect.runPromise(
      buildRuntimeFromLayer(pipe(Layer.succeed(ModuleRefTag, this.moduleRef), Layer.provide(this.layer))),
    );
  }

  async onModuleDestroy() {
    await Effect.runPromise(this.rt.clean);
  }

  get runPromise() {
    return Runtime.runPromise(this.rt.runtime);
  }
  get runSync() {
    return Runtime.runSync(this.rt.runtime);
  }
}

function buildRuntimeFromLayer<R, E, A>(layer: Layer.Layer<R, E, A>) {
  return Effect.gen(function* ($) {
    const scope = yield* $(Scope.make());
    const env = yield* $(Layer.buildWithScope(layer, scope));
    const runtime = yield* $(buildRuntimeFromContext(env));

    return {
      runtime,
      clean: Scope.close(scope, Exit.unit()),
    };
  });
}

function buildRuntimeFromContext<A>(env: Context.Context<A>) {
  return Effect.provideContext(Effect.runtime<A>(), env);
}
