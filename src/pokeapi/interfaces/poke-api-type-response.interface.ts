import { PokeApiNamedResource } from './poke-api-pokemon-response.interface';

export interface PokeApiTypeDamageRelations {
  no_damage_to: PokeApiNamedResource[];
  half_damage_to: PokeApiNamedResource[];
  double_damage_to: PokeApiNamedResource[];

  no_damage_from: PokeApiNamedResource[];
  half_damage_from: PokeApiNamedResource[];
  double_damage_from: PokeApiNamedResource[];
}

export interface PokeApiTypeResponse {
  id: number;
  name: string;
  damage_relations: PokeApiTypeDamageRelations;
}
