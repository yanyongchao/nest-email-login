export class UserCreatedEvent {
  constructor(
    public readonly username: string,
    public readonly email: string,
  ) {}
}
