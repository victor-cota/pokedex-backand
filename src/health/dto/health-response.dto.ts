import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    description: 'Estado atual da API',
    example: 'ok',
  })
  status!: string;

  @ApiProperty({
    description: 'Nome do serviço',
    example: 'pokedex-backend',
  })
  service!: string;

  @ApiProperty({
    description: 'Ambiente no qual a API está executando',
    example: 'development',
  })
  environment!: string;

  @ApiProperty({
    description: 'Data e hora da verificação',
    example: '2026-08-02T09:00:00.000Z',
    format: 'date-time',
  })
  timestamp!: string;
}
