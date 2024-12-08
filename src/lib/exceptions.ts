export class AuthenticationError extends Error {
  constructor(message = "Authentication error") {
    super(message);
    this.name = "AuthenticationError";
  }
}
