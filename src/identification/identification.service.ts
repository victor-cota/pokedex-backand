import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EvolutionService } from '../evolution/evolution.service';
import { GeminiService } from '../gemini/gemini.service';
import { NarrationService } from '../narration/narration.service';
import { PokemonResponseDto } from '../pokemon/dto/pokemon-response.dto';
import { PokemonService } from '../pokemon/pokemon.service';
import { TypeEffectivenessService } from '../type-effectiveness/type-effectiveness.service';
import { IdentificationResponseDto } from './dto/identification-response.dto';

@Injectable()
export class IdentificationService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly pokemonService: PokemonService,
    private readonly typeEffectivenessService: TypeEffectivenessService,
    private readonly evolutionService: EvolutionService,
    private readonly narrationService: NarrationService,
  ) {}

  async identifyImage(
    image: Express.Multer.File,
  ): Promise<IdentificationResponseDto> {
    const geminiResult = await this.geminiService.identifyPokemon(image);

    if (
      !geminiResult.pokemonEncontrado ||
      geminiResult.nome === null ||
      geminiResult.numeroPokedexNacional === null
    ) {
      return this.buildNotFoundResponse(
        geminiResult.confianca,
        geminiResult.observacao,
      );
    }

    const pokemon = await this.findPokemonOrNull(geminiResult.nome);

    if (!pokemon) {
      return this.buildUnconfirmedResponse(geminiResult.confianca);
    }

    const nameMatches = pokemon.nome === geminiResult.nome;

    const numberMatches =
      pokemon.numeroPokedexNacional === geminiResult.numeroPokedexNacional;

    if (!nameMatches || !numberMatches) {
      return this.buildUnconfirmedResponse(geminiResult.confianca);
    }

    const [effectiveness, evolution, narration] = await Promise.all([
      this.typeEffectivenessService.calculate(pokemon.nome),

      this.evolutionService.findEvolution(pokemon.nome),

      this.narrationService.createNarration(pokemon),
    ]);

    return {
      pokemonEncontrado: true,
      confianca: geminiResult.confianca,
      observacao: geminiResult.observacao,
      pokemon,
      efetividade: effectiveness,
      evolucao: evolution,
      narracao: narration,
    };
  }

  private async findPokemonOrNull(
    pokemonName: string,
  ): Promise<PokemonResponseDto | null> {
    try {
      return await this.pokemonService.findOne(pokemonName);
    } catch (error: unknown) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        return null;
      }

      throw error;
    }
  }

  private buildNotFoundResponse(
    confidence: number,
    observation: string,
  ): IdentificationResponseDto {
    return {
      pokemonEncontrado: false,
      confianca: confidence,
      observacao: observation,
      pokemon: null,
      efetividade: null,
      evolucao: null,
      narracao: null,
    };
  }

  private buildUnconfirmedResponse(
    confidence: number,
  ): IdentificationResponseDto {
    return {
      pokemonEncontrado: false,
      confianca: confidence,
      observacao: 'A identificação sugerida não foi confirmada pela PokéAPI.',
      pokemon: null,
      efetividade: null,
      evolucao: null,
      narracao: null,
    };
  }
}
