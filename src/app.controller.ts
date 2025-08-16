import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePersonCommand } from './commands/create-person.command';
import { GetPersonQuery } from './queries/get-person.query';

@Controller()
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('hello')
  async sayHello(@Query('who') who: string) {
    const person = await this.queryBus.execute(new GetPersonQuery(who));
    const name = person ? person.fullName : 'stranger';
    return { message: `Hello ${name}` };
  }

  @Post('people')
  async createPerson(@Body() body: { simpleName: string; fullName: string }) {
    await this.commandBus.execute(
      new CreatePersonCommand(body.simpleName, body.fullName),
    );
    return { success: true };
  }
}
