import { Injectable } from '@nestjs/common';

import { IdentificationUploadResponseDto } from './dto/identification-upload-response.dto';

@Injectable()
export class IdentificationService {
  receiveImage(image: Express.Multer.File): IdentificationUploadResponseDto {
    return {
      imagemRecebida: true,
      tipoMime: image.mimetype,
      tamanhoBytes: image.size,
      mensagem: 'Imagem recebida e validada com sucesso.',
    };
  }
}
