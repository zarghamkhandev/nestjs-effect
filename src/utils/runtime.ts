import { Injectable, OnModuleDestroy, OnModuleInit, Type } from '@nestjs/common';
import { Context, Effect, Exit, Layer, Runtime, Scope, pipe } from '../prelude';
import { ModuleRef } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource, DataSourceOptions } from 'typeorm';

export const ModuleRefTag = Context.Tag<ModuleRef>();

@Injectable()
export abstract class RuntimeBase<A> implements OnModuleInit, OnModuleDestroy {
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

export function getRepository(entity: EntityClassOrSchema, dataSource?: DataSource | DataSourceOptions | string) {
  return getService(getRepositoryToken(entity, dataSource));
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function getService<TInput = any>(typeOrToken: Type<TInput> | Function | string | symbol) {
  return Effect.map(ModuleRefTag, (_) => _.get(typeOrToken, { strict: false }));
}
