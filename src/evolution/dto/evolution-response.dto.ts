import { ApiProperty } from '@nestjs/swagger';

export class EvolutionConditionDto {
  @ApiProperty({
    description: 'Evento que provoca a evolução',
    example: 'level-up',
  })
  gatilho!: string;

  @ApiProperty({
    description: 'Nível mínimo necessário',
    type: Number,
    nullable: true,
    example: 16,
  })
  nivelMinimo!: number | null;

  @ApiProperty({
    description: 'Item utilizado diretamente na evolução',
    type: String,
    nullable: true,
    example: 'thunder-stone',
  })
  item!: string | null;

  @ApiProperty({
    description: 'Item que precisa estar sendo segurado',
    type: String,
    nullable: true,
    example: null,
  })
  itemSegurado!: string | null;

  @ApiProperty({
    description: 'Felicidade mínima necessária',
    type: Number,
    nullable: true,
    example: 220,
  })
  felicidadeMinima!: number | null;

  @ApiProperty({
    description: 'Beleza mínima necessária',
    type: Number,
    nullable: true,
    example: null,
  })
  belezaMinima!: number | null;

  @ApiProperty({
    description: 'Afeição mínima necessária',
    type: Number,
    nullable: true,
    example: null,
  })
  afeicaoMinima!: number | null;

  @ApiProperty({
    description: 'Horário necessário para a evolução',
    type: String,
    nullable: true,
    example: 'day',
  })
  horario!: string | null;

  @ApiProperty({
    description: 'Local necessário para a evolução',
    type: String,
    nullable: true,
    example: null,
  })
  local!: string | null;

  @ApiProperty({
    description: 'Movimento que o Pokémon precisa conhecer',
    type: String,
    nullable: true,
    example: null,
  })
  movimentoConhecido!: string | null;

  @ApiProperty({
    description: 'Tipo de movimento que o Pokémon precisa conhecer',
    type: String,
    nullable: true,
    example: 'fairy',
  })
  tipoMovimentoConhecido!: string | null;

  @ApiProperty({
    description: 'Espécie que precisa estar no grupo do jogador',
    type: String,
    nullable: true,
    example: null,
  })
  especieNoGrupo!: string | null;

  @ApiProperty({
    description: 'Tipo de Pokémon que precisa estar no grupo do jogador',
    type: String,
    nullable: true,
    example: null,
  })
  tipoNoGrupo!: string | null;

  @ApiProperty({
    description: 'Espécie necessária na troca que provoca a evolução',
    type: String,
    nullable: true,
    example: null,
  })
  especieDeTroca!: string | null;

  @ApiProperty({
    description: 'Identificador de gênero exigido pela PokéAPI',
    type: Number,
    nullable: true,
    example: null,
  })
  generoNecessarioId!: number | null;

  @ApiProperty({
    description: 'Relação necessária entre ataque e defesa: -1, 0 ou 1',
    type: Number,
    nullable: true,
    example: null,
  })
  estatisticaFisicaRelativa!: number | null;

  @ApiProperty({
    description: 'Informa se a evolução exige chuva no mundo aberto',
    example: false,
  })
  precisaChuva!: boolean;

  @ApiProperty({
    description:
      'Informa se a evolução exige virar o dispositivo de cabeça para baixo',
    example: false,
  })
  virarDeCabecaParaBaixo!: boolean;

  @ApiProperty({
    description:
      'Informa se a evolução precisa acontecer perto de uma rocha especial',
    example: false,
  })
  pertoDeRochaEspecial!: boolean;
}

export class EvolutionStageDto {
  @ApiProperty({
    description: 'Número da espécie na Pokédex Nacional',
    example: 2,
  })
  numeroPokedexNacional!: number;

  @ApiProperty({
    description: 'Nome oficial da espécie',
    example: 'ivysaur',
  })
  nome!: string;

  @ApiProperty({
    description: 'Informa se a espécie é um Pokémon bebê',
    example: false,
  })
  bebe!: boolean;

  @ApiProperty({
    description: 'Possíveis condições para chegar a esta etapa',
    type: [EvolutionConditionDto],
  })
  condicoes!: EvolutionConditionDto[];
}

export class EvolutionPathDto {
  @ApiProperty({
    description: 'Etapas de um caminho possível da cadeia evolutiva',
    type: [EvolutionStageDto],
  })
  etapas!: EvolutionStageDto[];
}

export class EvolutionResponseDto {
  @ApiProperty({
    description: 'Número da espécie consultada na Pokédex Nacional',
    example: 1,
  })
  numeroPokedexNacional!: number;

  @ApiProperty({
    description: 'Nome da espécie consultada',
    example: 'bulbasaur',
  })
  nome!: string;

  @ApiProperty({
    description: 'Identificador da cadeia evolutiva',
    example: 1,
  })
  idCadeiaEvolutiva!: number;

  @ApiProperty({
    description: 'Primeira espécie da cadeia evolutiva',
    example: 'bulbasaur',
  })
  especieBase!: string;

  @ApiProperty({
    description: 'Item relacionado à geração de uma espécie bebê',
    type: String,
    nullable: true,
    example: null,
  })
  itemParaGerarBebe!: string | null;

  @ApiProperty({
    description: 'Todos os caminhos possíveis da cadeia evolutiva',
    type: [EvolutionPathDto],
  })
  caminhos!: EvolutionPathDto[];
}
