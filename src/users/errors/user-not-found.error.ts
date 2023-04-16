export class UserNotFoundException extends Error {
  constructor(public userId: string) {
    super(`User is not found.`);
  }
}
