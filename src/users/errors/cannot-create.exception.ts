import { UserEntity } from '../entities/user.entity';
import { AbstractException } from '../../shared/abstract.exception';

export class CannotCreateException extends AbstractException {
  public _tag = 'CannotCreateException ';
  public _label = 'Can not create the user';
  constructor(public _user: Partial<UserEntity>, error: unknown) {
    super(error);
  }
}
