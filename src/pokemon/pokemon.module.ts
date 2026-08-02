import { Module } from '@nestjs/common';

import { PokeApiModule } from '../pokeapi/pokeapi.module';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [PokeApiModule],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}
