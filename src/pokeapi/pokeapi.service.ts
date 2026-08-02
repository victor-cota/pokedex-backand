import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isAxiosError } from 'axios';

import { PokeApiPokemonResponse } from './interfaces/poke-api-pokemon-response.interface';
import { PokeApiPokemonSpeciesResponse } from './interfaces/poke-api-pokemon-species-response.interface';
import { PokeApiTypeResponse } from './interfaces/poke-api-type-response.interface';

@Injectable()
export class PokeApiService {
  constructor(private readonly httpService: HttpService) {}

  async findPokemon(idOrName: string): Promise<PokeApiPokemonResponse> {
    const identifier = this.normalizeIdentifier(idOrName);

    return this.getResource<PokeApiPokemonResponse>(
      `pokemon/${encodeURIComponent(identifier)}`,
      `Pokémon "${idOrName}" não encontrado.`,
    );
  }

  async findPokemonSpecies(
    idOrName: string,
  ): Promise<PokeApiPokemonSpeciesResponse> {
    const identifier = this.normalizeIdentifier(idOrName);

    return this.getResource<PokeApiPokemonSpeciesResponse>(
      `pokemon-species/${encodeURIComponent(identifier)}`,
      `Espécie "${idOrName}" não encontrada.`,
    );
  }

  async findType(idOrName: string): Promise<PokeApiTypeResponse> {
    const identifier = this.normalizeIdentifier(idOrName);

    return this.getResource<PokeApiTypeResponse>(
      `type/${encodeURIComponent(identifier)}`,
      `Tipo "${idOrName}" não encontrado.`,
    );
  }

  private async getResource<T>(
    path: string,
    notFoundMessage: string,
  ): Promise<T> {
    try {
      const response = await this.httpService.axiosRef.get<T>(path);

      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        throw new NotFoundException(notFoundMessage);
      }

      if (isAxiosError(error)) {
        throw new BadGatewayException('Não foi possível consultar a PokéAPI.');
      }

      throw new BadGatewayException(
        'Ocorreu um erro inesperado ao consultar a PokéAPI.',
      );
    }
  }

  private normalizeIdentifier(idOrName: string): string {
    const identifier = idOrName.trim().toLowerCase();

    if (!identifier) {
      throw new BadRequestException('Informe o nome ou o número do recurso.');
    }

    if (/^\d+$/.test(identifier)) {
      const numericIdentifier = Number(identifier);

      if (numericIdentifier <= 0) {
        throw new BadRequestException('O número deve ser maior que zero.');
      }

      return identifier;
    }

    if (!/^[a-z0-9-]+$/.test(identifier)) {
      throw new BadRequestException(
        'O identificador possui caracteres inválidos.',
      );
    }

    return identifier;
  }
}
