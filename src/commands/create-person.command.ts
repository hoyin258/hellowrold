export class CreatePersonCommand {
  constructor(
    public readonly simpleName: string,
    public readonly fullName: string,
  ) {}
}
