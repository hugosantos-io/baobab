import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroRepository } from '../../repository/hero.repository';
import { GetHeroesByIdQuery } from '../impl/get-heroes-byid.query';

@QueryHandler(GetHeroesByIdQuery)
export class GetHeroesByIdHandler implements IQueryHandler<GetHeroesByIdQuery> {
  constructor(private readonly repository: HeroRepository) {}

  async execute(query: GetHeroesByIdQuery) {
    console.log(clc.yellowBright('Async GetHeroesByIdQuery: ' + query.id));
    return this.repository.findOneById(query.id);
  }
}
