export abstract class AbstractException extends Error {
  abstract _tag: string;
  abstract _label: string;

  constructor(error: unknown) {
    if (error instanceof Error) {
      super(error.message);
      this.stack = error.stack;
      this.name = error.name;
    }

    if (error instanceof String) {
      super(error.toString());
    }
  }
}
