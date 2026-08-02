import { Injectable } from '@nestjs/common';

import {
  PokeApiPokemonResponse,
  PokeApiSprites,
} from '../pokeapi/interfaces/poke-api-pokemon-response.interface';
import { PokeApiPokemonSpeciesResponse } from '../pokeapi/interfaces/poke-api-pokemon-species-response.interface';
import { PokeApiService } from '../pokeapi/pokeapi.service';
import { PokemonResponseDto } from './dto/pokemon-response.dto';

interface SelectedDescription {
  text: string | null;
  language: string | null;
}

@Injectable()
export class PokemonService {
  constructor(private readonly pokeApiService: PokeApiService) {}

  async findOne(idOrName: string): Promise<PokemonResponseDto> {
    const pokemon = await this.pokeApiService.findPokemon(idOrName);

    const species = await this.pokeApiService.findPokemonSpecies(
      pokemon.species.name,
    );

    return this.toResponse(pokemon, species);
  }

  private toResponse(
    pokemon: PokeApiPokemonResponse,
    species: PokeApiPokemonSpeciesResponse,
  ): PokemonResponseDto {
    const selectedDescription = this.selectDescription(species);

    return {
      numeroPokedexNacional: pokemon.id,
      nome: pokemon.name,

      categoria: this.selectCategory(species),

      descricaoBase: selectedDescription.text,

      idiomaDescricaoBase: selectedDescription.language,

      geracao: species.generation.name,

      habitat: species.habitat?.name ?? null,

      lendario: species.is_legendary,

      mitico: species.is_mythical,

      bebe: species.is_baby,

      evoluiDe: species.evolves_from_species?.name ?? null,

      alturaMetros: pokemon.height / 10,

      pesoQuilos: pokemon.weight / 10,

      tipos: [...pokemon.types]
        .sort((first, second) => first.slot - second.slot)
        .map((typeSlot) => typeSlot.type.name),

      habilidades: [...pokemon.abilities]
        .sort((first, second) => first.slot - second.slot)
        .map((abilitySlot) => ({
          nome: abilitySlot.ability.name,
          oculta: abilitySlot.is_hidden,
        })),

      estatisticas: pokemon.stats.map((statSlot) => ({
        nome: statSlot.stat.name,
        valorBase: statSlot.base_stat,
      })),

      imagem: this.selectImage(pokemon.sprites),

      som: pokemon.cries?.latest ?? pokemon.cries?.legacy ?? null,
    };
  }

  private selectDescription(
    species: PokeApiPokemonSpeciesResponse,
  ): SelectedDescription {
    const preferredLanguages = ['pt-br', 'pt', 'en'];

    for (const preferredLanguage of preferredLanguages) {
      const entry = species.flavor_text_entries.find(
        (flavorTextEntry) =>
          flavorTextEntry.language.name.toLowerCase() === preferredLanguage,
      );

      if (entry) {
        return {
          text: this.cleanText(entry.flavor_text),
          language: entry.language.name,
        };
      }
    }

    const fallbackEntry = species.flavor_text_entries[0];

    if (!fallbackEntry) {
      return {
        text: null,
        language: null,
      };
    }

    return {
      text: this.cleanText(fallbackEntry.flavor_text),
      language: fallbackEntry.language.name,
    };
  }

  private selectCategory(
    species: PokeApiPokemonSpeciesResponse,
  ): string | null {
    const preferredLanguages = ['pt-br', 'pt', 'en'];

    for (const preferredLanguage of preferredLanguages) {
      const genusEntry = species.genera.find(
        (currentGenus) =>
          currentGenus.language.name.toLowerCase() === preferredLanguage,
      );

      if (genusEntry) {
        return genusEntry.genus.trim();
      }
    }

    return species.genera[0]?.genus.trim() ?? null;
  }

  private cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  private selectImage(sprites: PokeApiSprites): string | null {
    return (
      sprites.other?.showdown?.front_default ??
      sprites.other?.home?.front_default ??
      sprites.other?.['official-artwork']?.front_default ??
      sprites.front_default ??
      null
    );
  }
}
