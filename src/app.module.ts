import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Person } from './person.entity';
import { AppController } from './app.controller';
import { CreatePersonHandler } from './commands/handlers/create-person.handler';
import { GetPersonHandler } from './queries/handlers/get-person.handler';
import { Admin } from './admin.entity';
import { FormConfig } from './form-config.entity';
import { FormRecord } from './form-record.entity';
import { AdminController } from './admin.controller';
import { FormConfigController } from './form-config.controller';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite',
      entities: [Person, Admin, FormConfig, FormRecord],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Person, Admin, FormConfig, FormRecord]),
  ],
  controllers: [AppController, AdminController, FormConfigController],
  providers: [CreatePersonHandler, GetPersonHandler],
})
export class AppModule {}
