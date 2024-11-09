import { Injectable } from '@nestjs/common';
import { Hero } from '../models/hero.model';
import { userHero } from './fixtures/user';

@Injectable()
export class HeroRepository {
  async findOneById(id: string): Promise<Hero> {
    return userHero.find(o => o.getId(id) === id);
  }

  async findAll(): Promise<Hero[]> {
    return userHero;
  }
}
