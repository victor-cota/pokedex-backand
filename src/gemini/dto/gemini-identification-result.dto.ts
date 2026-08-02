import { ApiProperty } from '@nestjs/swagger';

export class GeminiIdentificationResultDto {
  @ApiProperty({
    description:
      'Informa se um Pokémon foi identificado com segurança suficiente.',
    example: true,
  })
  pokemonEncontrado!: boolean;

  @ApiProperty({
    description: 'Nome sugerido pelo Gemini. Ainda será validado na PokéAPI.',
    type: String,
    nullable: true,
    example: 'pikachu',
  })
  nome!: string | null;

  @ApiProperty({
    description: 'Número sugerido pelo Gemini. Ainda será validado na PokéAPI.',
    type: Number,
    nullable: true,
    example: 25,
  })
  numeroPokedexNacional!: number | null;

  @ApiProperty({
    description: 'Confiança estimada pelo modelo, entre zero e um.',
    minimum: 0,
    maximum: 1,
    example: 0.94,
  })
  confianca!: number;

  @ApiProperty({
    description: 'Observação curta sobre o reconhecimento visual.',
    example: 'Características visuais compatíveis com Pikachu.',
  })
  observacao!: string;
}
