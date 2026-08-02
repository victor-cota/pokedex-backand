import { Module } from '@nestjs/common';

import { PokeApiModule } from '../pokeapi/pokeapi.module';
import { TypeEffectivenessController } from './type-effectiveness.controller';
import { TypeEffectivenessService } from './type-effectiveness.service';

@Module({
  imports: [PokeApiModule],
  controllers: [TypeEffectivenessController],
  providers: [TypeEffectivenessService],
})
export class TypeEffectivenessModule {}
