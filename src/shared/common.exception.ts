export abstract class CommonException extends Error {
  abstract _tag: string;
  abstract _label: string;

  constructor(_originalError: unknown) {
    if (_originalError instanceof Error) {
      super(_originalError.message);
      this.stack = _originalError.stack;
      this.name = _originalError.name;
    }
  }
}
