import { UserEntity } from '../entities/user.entity';
import { CommonException } from '../../shared/common.exception';

export class CannotCreateException extends CommonException {
  public _tag = 'CannotCreateException ';
  public _label = 'Can not create the user';
  constructor(public _user: Partial<UserEntity>, _originalError: unknown) {
    super(_originalError);
  }
}
