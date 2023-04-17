import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './tags';
import { Effect, Exit, Layer, Runtime, Scope } from '../prelude';

@Injectable()
export class UsersService {
  // TODO: build the runtime asynchronously https://docs.nestjs.com/fundamentals/async-providers
  // TODO: call cleanup https://github.com/nestjs/nest/issues/9497#issuecomment-1108703070
  // TODO: consider a global runtime, instead of one per module (users)
  private readonly runtime = Effect.runSync(buildRuntime(Layer.succeed(UsersRepository, this.usersRepository)));
  readonly runPromise = Runtime.runPromise(this.runtime.runtime);
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
}

function buildRuntime<R, E, A>(layer: Layer.Layer<R, E, A>) {
  return Effect.gen(function* ($) {
    const scope = yield* $(Scope.make());
    const env = yield* $(Layer.buildWithScope(layer, scope));
    const runtime = yield* $(Effect.provideContext(Effect.runtime<A>(), env));

    return {
      runtime,
      clean: Scope.close(scope, Exit.unit()),
    };
  });
}
