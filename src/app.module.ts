import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Person } from './person.entity';
import { AppController } from './app.controller';
import { CreatePersonHandler } from './commands/handlers/create-person.handler';
import { GetPersonHandler } from './queries/handlers/get-person.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite',
      entities: [Person],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Person]),
  ],
  controllers: [AppController],
  providers: [CreatePersonHandler, GetPersonHandler],
})
export class AppModule {}
