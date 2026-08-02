import { ApiProperty } from '@nestjs/swagger';

export class IdentificationUploadRequestDto {
  @ApiProperty({
    description:
      'Imagem contendo um Pokémon, desenho, carta, boneco, pelúcia ou outra representação.',
    type: 'string',
    format: 'binary',
  })
  imagem!: string;
}
