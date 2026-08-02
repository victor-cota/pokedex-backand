import { PokeApiNamedResource } from './poke-api-pokemon-response.interface';

interface PokeApiResourceUrl {
  url: string;
}

interface PokeApiFlavorTextEntry {
  flavor_text: string;
  language: PokeApiNamedResource;
  version: PokeApiNamedResource;
}

interface PokeApiGenusEntry {
  genus: string;
  language: PokeApiNamedResource;
}

export interface PokeApiPokemonSpeciesResponse {
  id: number;
  name: string;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  habitat: PokeApiNamedResource | null;
  generation: PokeApiNamedResource;
  evolves_from_species: PokeApiNamedResource | null;
  evolution_chain: PokeApiResourceUrl;
  flavor_text_entries: PokeApiFlavorTextEntry[];
  genera: PokeApiGenusEntry[];
}
