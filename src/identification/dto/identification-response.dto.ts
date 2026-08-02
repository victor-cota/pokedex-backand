import { ApiProperty } from '@nestjs/swagger';

import { EvolutionResponseDto } from '../../evolution/dto/evolution-response.dto';
import { NarrationResultDto } from '../../narration/dto/narration-result.dto';
import { PokemonResponseDto } from '../../pokemon/dto/pokemon-response.dto';
import { TypeEffectivenessResponseDto } from '../../type-effectiveness/dto/type-effectiveness-response.dto';

export class IdentificationResponseDto {
  @ApiProperty({
    description: 'Informa se a identificação foi confirmada pela PokéAPI.',
    example: true,
  })
  pokemonEncontrado!: boolean;

  @ApiProperty({
    description: 'Confiança estimada pelo Gemini, entre zero e um.',
    minimum: 0,
    maximum: 1,
    example: 0.94,
  })
  confianca!: number;

  @ApiProperty({
    description: 'Observação curta sobre o reconhecimento visual.',
    example: 'Características visuais compatíveis com Blaziken.',
  })
  observacao!: string;

  @ApiProperty({
    description: 'Dados oficiais do Pokémon confirmados pela PokéAPI.',
    type: PokemonResponseDto,
    nullable: true,
  })
  pokemon!: PokemonResponseDto | null;

  @ApiProperty({
    description: 'Fraquezas, resistências, imunidades e vantagens ofensivas.',
    type: TypeEffectivenessResponseDto,
    nullable: true,
  })
  efetividade!: TypeEffectivenessResponseDto | null;

  @ApiProperty({
    description: 'Cadeia evolutiva e condições de evolução.',
    type: EvolutionResponseDto,
    nullable: true,
  })
  evolucao!: EvolutionResponseDto | null;

  @ApiProperty({
    description: 'Descrição em português e texto pronto para o Text-to-Speech.',
    type: NarrationResultDto,
    nullable: true,
  })
  narracao!: NarrationResultDto | null;
}
