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
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';

import { IdentificationUploadRequestDto } from './dto/identification-upload-request.dto';
import { IdentificationUploadResponseDto } from './dto/identification-upload-response.dto';
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
    summary: 'Enviar uma imagem para identificação',
    description:
      'Recebe e valida uma imagem. A integração com o Gemini será adicionada na próxima etapa.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Imagem que será analisada',
    type: IdentificationUploadRequestDto,
  })
  @ApiOkResponse({
    description: 'Imagem recebida e validada com sucesso.',
    type: IdentificationUploadResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'A imagem não foi enviada ou possui um formato inválido.',
  })
  @ApiPayloadTooLargeResponse({
    description: 'A imagem ultrapassa o limite de 5 MB.',
  })
  receiveImage(
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
  ): IdentificationUploadResponseDto {
    return this.identificationService.receiveImage(image);
  }
}
