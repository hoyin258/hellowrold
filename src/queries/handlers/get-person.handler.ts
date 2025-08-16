import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPersonQuery } from '../get-person.query';
import { Person } from '../../person.entity';

@QueryHandler(GetPersonQuery)
export class GetPersonHandler implements IQueryHandler<GetPersonQuery> {
  constructor(
    @InjectRepository(Person)
    private readonly repo: Repository<Person>,
  ) {}

  async execute(query: GetPersonQuery): Promise<Person | undefined> {
    return this.repo.findOne({ where: { simpleName: query.simpleName } });
  }
}
