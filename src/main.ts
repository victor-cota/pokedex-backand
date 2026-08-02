import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Pokédex API')
    .setDescription(
      'API responsável por consultar dados de Pokémon e identificar Pokémon por imagem.',
    )
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(port);

  const logger = new Logger('Bootstrap');

  logger.log(`API executando em http://localhost:${port}`);
  logger.log(`Swagger disponível em http://localhost:${port}/docs`);
}

void bootstrap();
