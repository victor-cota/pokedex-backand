import { GoogleGenAI } from '@google/genai';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZodError } from 'zod';

import { GeminiIdentificationResultDto } from './dto/gemini-identification-result.dto';
import {
  GEMINI_IDENTIFICATION_PROMPT,
  GEMINI_SYSTEM_INSTRUCTION,
  MINIMUM_IDENTIFICATION_CONFIDENCE,
} from './gemini.constants';
import {
  GeminiIdentificationResult,
  geminiIdentificationJsonSchema,
  geminiIdentificationSchema,
} from './schemas/gemini-identification.schema';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);

  private readonly client: GoogleGenAI;

  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('GEMINI_API_KEY');

    this.model = this.configService.getOrThrow<string>('GEMINI_MODEL');

    this.client = new GoogleGenAI({
      apiKey,
    });
  }

  async identifyPokemon(
    image: Express.Multer.File,
  ): Promise<GeminiIdentificationResultDto> {
    const base64Image = image.buffer.toString('base64');

    try {
      const interaction = await this.client.interactions.create({
        model: this.model,

        system_instruction: GEMINI_SYSTEM_INSTRUCTION,

        input: [
          {
            type: 'text',
            text: GEMINI_IDENTIFICATION_PROMPT,
          },
          {
            type: 'image',
            data: base64Image,
            mime_type: image.mimetype,
          },
        ],

        response_format: {
          type: 'text',
          mime_type: 'application/json',
          schema: geminiIdentificationJsonSchema,
        },

        store: false,
      });

      const responseText = interaction.output_text;

      if (!responseText) {
        throw new BadGatewayException(
          'O Gemini não retornou uma identificação.',
        );
      }

      const result = this.parseResponse(responseText);

      return this.normalizeResult(result);
    } catch (error: unknown) {
      if (error instanceof BadGatewayException) {
        throw error;
      }

      this.logger.error(
        `Falha ao identificar imagem no Gemini: ${this.getErrorName(error)}`,
      );

      throw new BadGatewayException(
        'Não foi possível identificar a imagem com o Gemini.',
      );
    }
  }

  private parseResponse(responseText: string): GeminiIdentificationResult {
    try {
      const parsedResponse: unknown = JSON.parse(responseText);

      return geminiIdentificationSchema.parse(parsedResponse);
    } catch (error: unknown) {
      if (error instanceof SyntaxError || error instanceof ZodError) {
        throw new BadGatewayException(
          'O Gemini retornou uma identificação em formato inválido.',
        );
      }

      throw error;
    }
  }

  private normalizeResult(
    result: GeminiIdentificationResult,
  ): GeminiIdentificationResultDto {
    const normalizedConfidence = Math.round(result.confianca * 100) / 100;

    if (
      !result.pokemonEncontrado ||
      normalizedConfidence < MINIMUM_IDENTIFICATION_CONFIDENCE
    ) {
      return {
        pokemonEncontrado: false,
        nome: null,
        numeroPokedexNacional: null,
        confianca: normalizedConfidence,
        observacao: 'Não foi possível identificar um Pokémon com segurança.',
      };
    }

    return {
      pokemonEncontrado: true,
      nome: result.nome?.trim().toLowerCase() ?? null,
      numeroPokedexNacional: result.numeroPokedexNacional,
      confianca: normalizedConfidence,
      observacao: result.observacao.trim(),
    };
  }

  private getErrorName(error: unknown): string {
    return error instanceof Error ? error.name : 'UnknownError';
  }
}
