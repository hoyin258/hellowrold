import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreatePersonCommand } from '../create-person.command';
import { Person } from '../../person.entity';

@CommandHandler(CreatePersonCommand)
export class CreatePersonHandler implements ICommandHandler<CreatePersonCommand> {
  constructor(
    @InjectRepository(Person)
    private readonly repo: MongoRepository<Person>,
  ) {}

  async execute(command: CreatePersonCommand) {
    const person = this.repo.create({
      simpleName: command.simpleName,
      fullName: command.fullName,
    });
    await this.repo.save(person);
    return person;
  }
}
