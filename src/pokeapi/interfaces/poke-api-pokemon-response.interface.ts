export interface PokeApiNamedResource {
  name: string;
  url: string;
}

interface PokeApiAbilitySlot {
  ability: PokeApiNamedResource;
  is_hidden: boolean;
  slot: number;
}

interface PokeApiTypeSlot {
  slot: number;
  type: PokeApiNamedResource;
}

interface PokeApiStatSlot {
  base_stat: number;
  effort: number;
  stat: PokeApiNamedResource;
}

interface PokeApiSpriteImage {
  front_default: string | null;
}

export interface PokeApiSprites {
  front_default: string | null;
  other?: {
    showdown?: PokeApiSpriteImage;
    home?: PokeApiSpriteImage;
    'official-artwork'?: PokeApiSpriteImage;
  };
}

interface PokeApiCries {
  latest: string | null;
  legacy: string | null;
}

export interface PokeApiPokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokeApiAbilitySlot[];
  types: PokeApiTypeSlot[];
  stats: PokeApiStatSlot[];
  sprites: PokeApiSprites;
  cries?: PokeApiCries;
  species: PokeApiNamedResource;
}
