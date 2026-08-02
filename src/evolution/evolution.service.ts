import { BadGatewayException, Injectable } from '@nestjs/common';

import {
  PokeApiEvolutionChainLink,
  PokeApiEvolutionDetail,
} from '../pokeapi/interfaces/poke-api-evolution-chain-response.interface';
import { PokeApiService } from '../pokeapi/pokeapi.service';
import {
  EvolutionConditionDto,
  EvolutionPathDto,
  EvolutionResponseDto,
  EvolutionStageDto,
} from './dto/evolution-response.dto';

@Injectable()
export class EvolutionService {
  constructor(private readonly pokeApiService: PokeApiService) {}

  async findEvolution(idOrName: string): Promise<EvolutionResponseDto> {
    const pokemon = await this.pokeApiService.findPokemon(idOrName);

    const species = await this.pokeApiService.findPokemonSpecies(
      pokemon.species.name,
    );

    const evolutionChainId = this.extractIdFromUrl(
      species.evolution_chain.url,
      'cadeia evolutiva',
    );

    const evolutionChain =
      await this.pokeApiService.findEvolutionChain(evolutionChainId);

    return {
      numeroPokedexNacional: species.id,
      nome: species.name,
      idCadeiaEvolutiva: evolutionChain.id,
      especieBase: evolutionChain.chain.species.name,
      itemParaGerarBebe: evolutionChain.baby_trigger_item?.name ?? null,
      caminhos: this.buildPaths(evolutionChain.chain),
    };
  }

  private buildPaths(
    currentLink: PokeApiEvolutionChainLink,
    previousStages: EvolutionStageDto[] = [],
  ): EvolutionPathDto[] {
    const currentStage = this.toStage(currentLink);

    const currentPath = [...previousStages, currentStage];

    if (currentLink.evolves_to.length === 0) {
      return [
        {
          etapas: currentPath,
        },
      ];
    }

    return currentLink.evolves_to.flatMap((nextEvolution) =>
      this.buildPaths(nextEvolution, currentPath),
    );
  }

  private toStage(chainLink: PokeApiEvolutionChainLink): EvolutionStageDto {
    const speciesId = this.extractIdFromUrl(
      chainLink.species.url,
      `espécie "${chainLink.species.name}"`,
    );

    return {
      numeroPokedexNacional: speciesId,
      nome: chainLink.species.name,
      bebe: chainLink.is_baby,
      condicoes: (chainLink.evolution_details ?? []).map((evolutionDetail) =>
        this.toCondition(evolutionDetail),
      ),
    };
  }

  private toCondition(detail: PokeApiEvolutionDetail): EvolutionConditionDto {
    const timeOfDay = detail.time_of_day.trim();

    return {
      gatilho: detail.trigger.name,
      nivelMinimo: detail.min_level,
      item: detail.item?.name ?? null,
      itemSegurado: detail.held_item?.name ?? null,
      felicidadeMinima: detail.min_happiness,
      belezaMinima: detail.min_beauty,
      afeicaoMinima: detail.min_affection,
      horario: timeOfDay || null,
      local: detail.location?.name ?? null,
      movimentoConhecido: detail.known_move?.name ?? null,
      tipoMovimentoConhecido: detail.known_move_type?.name ?? null,
      especieNoGrupo: detail.party_species?.name ?? null,
      tipoNoGrupo: detail.party_type?.name ?? null,
      especieDeTroca: detail.trade_species?.name ?? null,
      generoNecessarioId: detail.gender,
      estatisticaFisicaRelativa: detail.relative_physical_stats,
      precisaChuva: detail.needs_overworld_rain,
      virarDeCabecaParaBaixo: detail.turn_upside_down,
      pertoDeRochaEspecial: detail.near_special_rock,
    };
  }

  private extractIdFromUrl(resourceUrl: string, resourceName: string): number {
    const match = resourceUrl.match(/\/(\d+)\/?$/);
    const capturedId = match?.[1];

    if (!capturedId) {
      throw new BadGatewayException(
        `A PokéAPI retornou uma URL inválida para ${resourceName}.`,
      );
    }

    const resourceId = Number(capturedId);

    if (!Number.isInteger(resourceId) || resourceId <= 0) {
      throw new BadGatewayException(
        `A PokéAPI retornou um identificador inválido para ${resourceName}.`,
      );
    }

    return resourceId;
  }
}
