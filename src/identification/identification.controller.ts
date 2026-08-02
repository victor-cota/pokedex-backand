import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GeminiIdentificationResultDto } from '../gemini/dto/gemini-identification-result.dto';
import { IdentificationUploadRequestDto } from './dto/identification-upload-request.dto';
import {
  ALLOWED_IMAGE_TYPES,
  IMAGE_UPLOAD_FIELD,
  IMAGE_VALIDATION_ERROR_MESSAGE,
  MAX_IMAGE_SIZE_BYTES,
} from './identification.constants';
import { IdentificationService } from './identification.service';

@ApiTags('Identificações')
@Controller('identifications')
export class IdentificationController {
  constructor(private readonly identificationService: IdentificationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor(IMAGE_UPLOAD_FIELD, {
      limits: {
        files: 1,
        fileSize: MAX_IMAGE_SIZE_BYTES,
      },
    }),
  )
  @ApiOperation({
    summary: 'Identificar um Pokémon por imagem',
    description:
      'Recebe uma imagem, valida o arquivo e usa o Gemini para sugerir qual Pokémon está representado.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Imagem que será analisada',
    type: IdentificationUploadRequestDto,
  })
  @ApiOkResponse({
    description:
      'Imagem analisada pelo Gemini. O resultado ainda será validado na PokéAPI.',
    type: GeminiIdentificationResultDto,
  })
  @ApiBadRequestResponse({
    description: 'A imagem não foi enviada ou possui um formato inválido.',
  })
  @ApiPayloadTooLargeResponse({
    description: 'A imagem ultrapassa o limite de 5 MB.',
  })
  @ApiBadGatewayResponse({
    description: 'O Gemini não respondeu ou devolveu um resultado inválido.',
  })
  identifyImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: MAX_IMAGE_SIZE_BYTES,
          }),
          new FileTypeValidator({
            fileType: ALLOWED_IMAGE_TYPES,
          }),
        ],
        exceptionFactory: () =>
          new BadRequestException(IMAGE_VALIDATION_ERROR_MESSAGE),
      }),
    )
    image: Express.Multer.File,
  ): Promise<GeminiIdentificationResultDto> {
    return this.identificationService.identifyImage(image);
  }
}
