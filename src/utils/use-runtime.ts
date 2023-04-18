import { Context, Effect, Runtime } from '../prelude';

type TagServicePair<Tag extends Context.Tag<any, any>> = [Tag, Context.Tag.Service<Tag>];

type Pairs<Tags extends Context.Tag<any, any>[]> = {
  [K in keyof Tags]: TagServicePair<Tags[K]>;
};

// TODO: build the runtime asynchronously https://docs.nestjs.com/fundamentals/async-providers
// TODO: consider a global runtime, instead of one per module (users)
export abstract class UseRuntime<Tags extends Context.Tag<any, any>[]> {
  protected readonly context: Context.Context<{ [K in keyof Tags]: Context.Tag.Identifier<Tags[K]> }[number]>;
  protected readonly runtime: Runtime.Runtime<{ [K in keyof Tags]: Context.Tag.Identifier<Tags[K]> }[number]>;
  public readonly runPromise: <E, A>(
    effect: Effect.Effect<{ [K in keyof Tags]: Context.Tag.Identifier<Tags[K]> }[number], E, A>,
  ) => Promise<A>;

  constructor(pairs: Pairs<Tags>) {
    this.context = createContextFromTagsAndServices(pairs);
    this.runtime = Effect.runSync(buildRuntimeFromContext(this.context));
    this.runPromise = Runtime.runPromise(this.runtime);
  }
}

function createContextFromTagsAndServices<Tags extends Context.Tag<any, any>[]>(
  pairs: Pairs<Tags>,
): Context.Context<{ [K in keyof Tags]: Context.Tag.Identifier<Tags[K]> }[number]> {
  return pairs.reduce<Context.Context<{ [K in keyof Tags]: Context.Tag.Identifier<Tags[K]> }[number]>>(
    (ctx, [tag, service]) => {
      return Context.add(tag, service)(ctx);
    },
    Context.empty() as Context.Context<{ [K in keyof Tags]: Context.Tag.Identifier<Tags[K]> }[number]>,
  );
}

function buildRuntimeFromContext<A>(env: Context.Context<A>) {
  return Effect.provideContext(Effect.runtime<A>(), env);
}
