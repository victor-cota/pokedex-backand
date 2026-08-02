import { Module } from '@nestjs/common';

import { GeminiModule } from '../gemini/gemini.module';
import { NarrationService } from './narration.service';

@Module({
  imports: [GeminiModule],
  providers: [NarrationService],
  exports: [NarrationService],
})
export class NarrationModule {}
