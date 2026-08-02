import { ApiProperty } from '@nestjs/swagger';

export class PokemonAbilityDto {
  @ApiProperty({
    description: 'Nome da habilidade na PokéAPI',
    example: 'static',
  })
  nome!: string;

  @ApiProperty({
    description: 'Informa se é uma habilidade oculta',
    example: false,
  })
  oculta!: boolean;
}

export class PokemonStatDto {
  @ApiProperty({
    description: 'Nome da estatística',
    example: 'speed',
  })
  nome!: string;

  @ApiProperty({
    description: 'Valor base da estatística',
    example: 90,
  })
  valorBase!: number;
}

export class PokemonResponseDto {
  @ApiProperty({
    description: 'Número na Pokédex Nacional',
    example: 25,
  })
  numeroPokedexNacional!: number;

  @ApiProperty({
    description: 'Nome oficial usado pela PokéAPI',
    example: 'pikachu',
  })
  nome!: string;

  @ApiProperty({
    description: 'Categoria da espécie no idioma disponível',
    type: String,
    nullable: true,
    example: 'Mouse Pokémon',
  })
  categoria!: string | null;

  @ApiProperty({
    description:
      'Texto-base obtido da PokéAPI. Ainda não é a narração final em português.',
    type: String,
    nullable: true,
    example:
      'When several of these Pokémon gather, their electricity can build and cause lightning storms.',
  })
  descricaoBase!: string | null;

  @ApiProperty({
    description: 'Código do idioma utilizado na descrição-base',
    type: String,
    nullable: true,
    example: 'en',
  })
  idiomaDescricaoBase!: string | null;

  @ApiProperty({
    description: 'Geração em que a espécie foi introduzida',
    example: 'generation-i',
  })
  geracao!: string;

  @ApiProperty({
    description: 'Habitat da espécie, quando disponível',
    type: String,
    nullable: true,
    example: 'forest',
  })
  habitat!: string | null;

  @ApiProperty({
    description: 'Informa se a espécie é lendária',
    example: false,
  })
  lendario!: boolean;

  @ApiProperty({
    description: 'Informa se a espécie é mítica',
    example: false,
  })
  mitico!: boolean;

  @ApiProperty({
    description: 'Informa se é uma espécie bebê',
    example: false,
  })
  bebe!: boolean;

  @ApiProperty({
    description: 'Espécie anterior da qual este Pokémon evolui',
    type: String,
    nullable: true,
    example: 'pichu',
  })
  evoluiDe!: string | null;

  @ApiProperty({
    description: 'Altura em metros',
    example: 0.4,
  })
  alturaMetros!: number;

  @ApiProperty({
    description: 'Peso em quilogramas',
    example: 6,
  })
  pesoQuilos!: number;

  @ApiProperty({
    description: 'Tipos do Pokémon',
    type: [String],
    example: ['electric'],
  })
  tipos!: string[];

  @ApiProperty({
    description: 'Habilidades do Pokémon',
    type: [PokemonAbilityDto],
  })
  habilidades!: PokemonAbilityDto[];

  @ApiProperty({
    description: 'Estatísticas básicas do Pokémon',
    type: [PokemonStatDto],
  })
  estatisticas!: PokemonStatDto[];

  @ApiProperty({
    description: 'Melhor imagem disponível',
    type: String,
    nullable: true,
    example:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif',
  })
  imagem!: string | null;

  @ApiProperty({
    description: 'Som do Pokémon, quando disponível',
    type: String,
    nullable: true,
    example:
      'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg',
  })
  som!: string | null;
}
