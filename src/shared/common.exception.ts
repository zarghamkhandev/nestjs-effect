import { AbstractException } from './abstract.exception';

export class CommonException extends AbstractException {
  public _tag = 'CommonException';

  constructor(public _label: string, _originalError: unknown) {
    super(_originalError);
  }
}
