import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envValidationSchema } from './config/env.validation';
import { EvolutionModule } from './evolution/evolution.module';
import { HealthModule } from './health/health.module';
import { IdentificationModule } from './identification/identification.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeEffectivenessModule } from './type-effectiveness/type-effectiveness.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    HealthModule,
    PokemonModule,
    TypeEffectivenessModule,
    EvolutionModule,
    IdentificationModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
