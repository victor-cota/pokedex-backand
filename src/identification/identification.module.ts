import { Module } from '@nestjs/common';

import { GeminiModule } from '../gemini/gemini.module';
import { IdentificationController } from './identification.controller';
import { IdentificationService } from './identification.service';

@Module({
  imports: [GeminiModule],
  controllers: [IdentificationController],
  providers: [IdentificationService],
})
export class IdentificationModule {}
