import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './tags';
import { Context, Effect, Runtime } from '../prelude';

@Injectable()
export class UsersService {
  // TODO: build the runtime asynchronously https://docs.nestjs.com/fundamentals/async-providers
  // TODO: consider a global runtime, instead of one per module (users)
  private readonly runtime = Effect.runSync(
    buildRuntimeFromContext(Context.make(UsersRepository, this.usersRepository)),
  );
  readonly runPromise = Runtime.runPromise(this.runtime);
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
}

// // TODO: call cleanup https://github.com/nestjs/nest/issues/9497#issuecomment-1108703070
// function buildRuntimeFromLayer<R, E, A>(layer: Layer.Layer<R, E, A>) {
//   return Effect.gen(function* ($) {
//     const scope = yield* $(Scope.make());
//     const env = yield* $(Layer.buildWithScope(layer, scope));
//     const runtime = yield* $(buildRuntimeFromContext(env));

//     return {
//       runtime,
//       clean: Scope.close(scope, Exit.unit()),
//     };
//   });
// }

function buildRuntimeFromContext<A>(env: Context.Context<A>) {
  return Effect.provideContext(Effect.runtime<A>(), env);
}
