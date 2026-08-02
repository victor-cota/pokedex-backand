import { ApiProperty } from '@nestjs/swagger';

export class IdentificationUploadResponseDto {
  @ApiProperty({
    description: 'Informa se a imagem foi recebida e validada',
    example: true,
  })
  imagemRecebida!: boolean;

  @ApiProperty({
    description: 'Tipo MIME detectado para a imagem',
    example: 'image/jpeg',
  })
  tipoMime!: string;

  @ApiProperty({
    description: 'Tamanho do arquivo em bytes',
    example: 245812,
  })
  tamanhoBytes!: number;

  @ApiProperty({
    description: 'Resultado desta etapa do processamento',
    example: 'Imagem recebida e validada com sucesso.',
  })
  mensagem!: string;
}
