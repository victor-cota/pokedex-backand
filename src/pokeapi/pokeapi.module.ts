import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PokeApiService } from './pokeapi.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.getOrThrow<string>('POKEAPI_BASE_URL'),
        timeout: 7000,
        headers: {
          Accept: 'application/json',
        },
      }),
    }),
  ],
  providers: [PokeApiService],
  exports: [PokeApiService],
})
export class PokeApiModule {}
