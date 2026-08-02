import { ApiProperty } from '@nestjs/swagger';

export class TypeMultiplierDto {
  @ApiProperty({
    description: 'Nome do tipo atacante',
    example: 'rock',
  })
  tipo!: string;

  @ApiProperty({
    description: 'Multiplicador de dano recebido',
    example: 4,
  })
  multiplicador!: number;
}

export class OffensiveTypeEffectivenessDto {
  @ApiProperty({
    description: 'Tipo utilizado para atacar',
    example: 'fire',
  })
  tipoAtacante!: string;

  @ApiProperty({
    description: 'Tipos contra os quais o ataque causa o dobro do dano',
    type: [String],
    example: ['grass', 'ice', 'bug', 'steel'],
  })
  superEfetivoContra!: string[];

  @ApiProperty({
    description: 'Tipos contra os quais o ataque causa metade do dano',
    type: [String],
    example: ['fire', 'water', 'rock', 'dragon'],
  })
  poucoEfetivoContra!: string[];

  @ApiProperty({
    description: 'Tipos contra os quais o ataque não causa dano',
    type: [String],
    example: [],
  })
  semEfeitoContra!: string[];
}

export class TypeEffectivenessResponseDto {
  @ApiProperty({
    description: 'Número na Pokédex Nacional',
    example: 6,
  })
  numeroPokedexNacional!: number;

  @ApiProperty({
    description: 'Nome oficial do Pokémon',
    example: 'charizard',
  })
  nome!: string;

  @ApiProperty({
    description: 'Tipos do Pokémon',
    type: [String],
    example: ['fire', 'flying'],
  })
  tipos!: string[];

  @ApiProperty({
    description: 'Fraquezas com multiplicador 4x',
    type: [TypeMultiplierDto],
  })
  fraquezasMuitoAltas!: TypeMultiplierDto[];

  @ApiProperty({
    description: 'Fraquezas com multiplicador 2x',
    type: [TypeMultiplierDto],
  })
  fraquezas!: TypeMultiplierDto[];

  @ApiProperty({
    description: 'Resistências com multiplicador 0,5x',
    type: [TypeMultiplierDto],
  })
  resistencias!: TypeMultiplierDto[];

  @ApiProperty({
    description: 'Resistências altas com multiplicador 0,25x',
    type: [TypeMultiplierDto],
  })
  resistenciasAltas!: TypeMultiplierDto[];

  @ApiProperty({
    description: 'Imunidades com multiplicador 0x',
    type: [TypeMultiplierDto],
  })
  imunidades!: TypeMultiplierDto[];

  @ApiProperty({
    description: 'Efetividade ofensiva de cada tipo do Pokémon',
    type: [OffensiveTypeEffectivenessDto],
  })
  vantagensOfensivasPorTipo!: OffensiveTypeEffectivenessDto[];
}
