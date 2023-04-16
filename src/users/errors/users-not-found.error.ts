export class UsersNotFoundException extends Error {
  constructor() {
    super(`Users not found.`);
  }
}
