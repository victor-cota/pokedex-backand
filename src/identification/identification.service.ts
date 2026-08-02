import { Injectable } from '@nestjs/common';

import { GeminiIdentificationResultDto } from '../gemini/dto/gemini-identification-result.dto';
import { GeminiService } from '../gemini/gemini.service';

@Injectable()
export class IdentificationService {
  constructor(private readonly geminiService: GeminiService) {}

  identifyImage(
    image: Express.Multer.File,
  ): Promise<GeminiIdentificationResultDto> {
    return this.geminiService.identifyPokemon(image);
  }
}
