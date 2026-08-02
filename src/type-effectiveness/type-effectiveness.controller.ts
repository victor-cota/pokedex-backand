import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { TypeEffectivenessResponseDto } from './dto/type-effectiveness-response.dto';
import { TypeEffectivenessService } from './type-effectiveness.service';

@ApiTags('Efetividade de tipos')
@Controller('pokemon')
export class TypeEffectivenessController {
  constructor(
    private readonly typeEffectivenessService: TypeEffectivenessService,
  ) {}

  @Get(':idOrName/effectiveness')
  @ApiOperation({
    summary: 'Calcular a efetividade dos tipos',
    description:
      'Calcula fraquezas, resistências, imunidades e vantagens ofensivas do Pokémon.',
  })
  @ApiParam({
    name: 'idOrName',
    description: 'Nome ou número do Pokémon',
    examples: {
      porNome: {
        summary: 'Busca pelo nome',
        value: 'charizard',
      },
      porNumero: {
        summary: 'Busca pelo número',
        value: '6',
      },
    },
  })
  @ApiOkResponse({
    description: 'Efetividade dos tipos calculada com sucesso.',
    type: TypeEffectivenessResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Nome ou número em formato inválido.',
  })
  @ApiNotFoundResponse({
    description: 'Pokémon ou tipo não encontrado.',
  })
  @ApiBadGatewayResponse({
    description: 'Não foi possível consultar a PokéAPI.',
  })
  calculate(
    @Param('idOrName') idOrName: string,
  ): Promise<TypeEffectivenessResponseDto> {
    return this.typeEffectivenessService.calculate(idOrName);
  }
}
