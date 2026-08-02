import { Injectable } from '@nestjs/common';

import { PokeApiNamedResource } from '../pokeapi/interfaces/poke-api-pokemon-response.interface';
import { PokeApiTypeResponse } from '../pokeapi/interfaces/poke-api-type-response.interface';
import { PokeApiService } from '../pokeapi/pokeapi.service';
import {
  OffensiveTypeEffectivenessDto,
  TypeEffectivenessResponseDto,
  TypeMultiplierDto,
} from './dto/type-effectiveness-response.dto';

@Injectable()
export class TypeEffectivenessService {
  constructor(private readonly pokeApiService: PokeApiService) {}

  async calculate(idOrName: string): Promise<TypeEffectivenessResponseDto> {
    const pokemon = await this.pokeApiService.findPokemon(idOrName);

    const typeNames = [...pokemon.types]
      .sort((first, second) => first.slot - second.slot)
      .map((typeSlot) => typeSlot.type.name);

    const typeResponses = await Promise.all(
      typeNames.map((typeName) => this.pokeApiService.findType(typeName)),
    );

    const defensiveMultipliers =
      this.calculateDefensiveMultipliers(typeResponses);

    return {
      numeroPokedexNacional: pokemon.id,
      nome: pokemon.name,
      tipos: typeNames,

      fraquezasMuitoAltas: this.selectByMultiplier(defensiveMultipliers, 4),

      fraquezas: this.selectByMultiplier(defensiveMultipliers, 2),

      resistencias: this.selectByMultiplier(defensiveMultipliers, 0.5),

      resistenciasAltas: this.selectByMultiplier(defensiveMultipliers, 0.25),

      imunidades: this.selectByMultiplier(defensiveMultipliers, 0),

      vantagensOfensivasPorTipo:
        this.calculateOffensiveEffectiveness(typeResponses),
    };
  }

  private calculateDefensiveMultipliers(
    typeResponses: PokeApiTypeResponse[],
  ): Map<string, number> {
    const multipliers = new Map<string, number>();

    for (const typeResponse of typeResponses) {
      const relations = typeResponse.damage_relations;

      this.multiplyRelations(multipliers, relations.double_damage_from, 2);

      this.multiplyRelations(multipliers, relations.half_damage_from, 0.5);

      this.multiplyRelations(multipliers, relations.no_damage_from, 0);
    }

    return multipliers;
  }

  private multiplyRelations(
    multipliers: Map<string, number>,
    types: PokeApiNamedResource[],
    factor: number,
  ): void {
    for (const type of types) {
      const currentMultiplier = multipliers.get(type.name) ?? 1;

      multipliers.set(type.name, currentMultiplier * factor);
    }
  }

  private selectByMultiplier(
    multipliers: Map<string, number>,
    expectedMultiplier: number,
  ): TypeMultiplierDto[] {
    return Array.from(multipliers.entries())
      .filter(([, multiplier]) => multiplier === expectedMultiplier)
      .map(([type, multiplier]) => ({
        tipo: type,
        multiplicador: multiplier,
      }))
      .sort((first, second) => first.tipo.localeCompare(second.tipo));
  }

  private calculateOffensiveEffectiveness(
    typeResponses: PokeApiTypeResponse[],
  ): OffensiveTypeEffectivenessDto[] {
    return typeResponses.map((typeResponse) => ({
      tipoAtacante: typeResponse.name,

      superEfetivoContra: this.extractAndSortNames(
        typeResponse.damage_relations.double_damage_to,
      ),

      poucoEfetivoContra: this.extractAndSortNames(
        typeResponse.damage_relations.half_damage_to,
      ),

      semEfeitoContra: this.extractAndSortNames(
        typeResponse.damage_relations.no_damage_to,
      ),
    }));
  }

  private extractAndSortNames(resources: PokeApiNamedResource[]): string[] {
    return resources
      .map((resource) => resource.name)
      .sort((first, second) => first.localeCompare(second));
  }
}
