import { Module } from '@nestjs/common';

import { PokeApiModule } from '../pokeapi/pokeapi.module';
import { EvolutionController } from './evolution.controller';
import { EvolutionService } from './evolution.service';

@Module({
  imports: [PokeApiModule],
  controllers: [EvolutionController],
  providers: [EvolutionService],
  exports: [EvolutionService],
})
export class EvolutionModule {}
