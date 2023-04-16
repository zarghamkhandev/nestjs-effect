export class UsersNotFoundException extends Error {
  constructor() {
    super(`User is not found.`);
  }
}
