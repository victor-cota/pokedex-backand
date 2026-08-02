import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { HealthResponseDto } from './dto/health-response.dto';

@ApiTags('Saúde')
@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @ApiOperation({
    summary: 'Verificar o estado da API',
    description:
      'Informa se o backend da Pokédex está executando corretamente.',
  })
  @ApiOkResponse({
    description: 'A API está funcionando corretamente.',
    type: HealthResponseDto,
  })
  getHealth(): HealthResponseDto {
    const environment = this.configService.get<string>(
      'NODE_ENV',
      'development',
    );

    return {
      status: 'ok',
      service: 'pokedex-backend',
      environment,
      timestamp: new Date().toISOString(),
    };
  }
}
