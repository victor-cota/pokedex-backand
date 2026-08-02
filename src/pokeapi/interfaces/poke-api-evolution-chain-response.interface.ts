import { PokeApiNamedResource } from './poke-api-pokemon-response.interface';

export interface PokeApiEvolutionDetail {
  item: PokeApiNamedResource | null;
  trigger: PokeApiNamedResource;
  gender: number | null;
  held_item: PokeApiNamedResource | null;
  known_move: PokeApiNamedResource | null;
  known_move_type: PokeApiNamedResource | null;
  location: PokeApiNamedResource | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: PokeApiNamedResource | null;
  party_type: PokeApiNamedResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: PokeApiNamedResource | null;
  turn_upside_down: boolean;
  near_special_rock: boolean;
}

export interface PokeApiEvolutionChainLink {
  is_baby: boolean;
  species: PokeApiNamedResource;
  evolution_details: PokeApiEvolutionDetail[] | null;
  evolves_to: PokeApiEvolutionChainLink[];
}

export interface PokeApiEvolutionChainResponse {
  id: number;
  baby_trigger_item: PokeApiNamedResource | null;
  chain: PokeApiEvolutionChainLink;
}
