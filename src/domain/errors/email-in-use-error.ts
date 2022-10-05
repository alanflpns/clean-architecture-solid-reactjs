export class EmailInUseError extends Error {
  constructor() {
    super("Esse e-mail ja está em uso");
    this.name = "EmailInUseError";
  }
}
