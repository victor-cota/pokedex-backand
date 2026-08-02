import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface HealthResponse {
  status: string;
  service: string;
  environment: string;
  timestamp: string;
}

@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHealth(): HealthResponse {
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
