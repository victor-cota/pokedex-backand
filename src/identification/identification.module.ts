import { Module } from '@nestjs/common';

import { EvolutionModule } from '../evolution/evolution.module';
import { GeminiModule } from '../gemini/gemini.module';
import { NarrationModule } from '../narration/narration.module';
import { PokemonModule } from '../pokemon/pokemon.module';
import { TypeEffectivenessModule } from '../type-effectiveness/type-effectiveness.module';
import { IdentificationController } from './identification.controller';
import { IdentificationService } from './identification.service';

@Module({
  imports: [
    GeminiModule,
    PokemonModule,
    TypeEffectivenessModule,
    EvolutionModule,
    NarrationModule,
  ],
  controllers: [IdentificationController],
  providers: [IdentificationService],
})
export class IdentificationModule {}
