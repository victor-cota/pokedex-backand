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

import { EvolutionResponseDto } from './dto/evolution-response.dto';
import { EvolutionService } from './evolution.service';

@ApiTags('Evoluções')
@Controller('pokemon')
export class EvolutionController {
  constructor(private readonly evolutionService: EvolutionService) {}

  @Get(':idOrName/evolution')
  @ApiOperation({
    summary: 'Buscar a cadeia evolutiva',
    description:
      'Busca todos os caminhos e condições da cadeia evolutiva de um Pokémon.',
  })
  @ApiParam({
    name: 'idOrName',
    description: 'Nome ou número do Pokémon',
    examples: {
      porNome: {
        summary: 'Busca pelo nome',
        value: 'bulbasaur',
      },
      porNumero: {
        summary: 'Busca pelo número',
        value: '1',
      },
      comRamificacoes: {
        summary: 'Cadeia com várias ramificações',
        value: 'eevee',
      },
    },
  })
  @ApiOkResponse({
    description: 'Cadeia evolutiva encontrada com sucesso.',
    type: EvolutionResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Nome ou número em formato inválido.',
  })
  @ApiNotFoundResponse({
    description: 'Pokémon, espécie ou cadeia evolutiva não encontrada.',
  })
  @ApiBadGatewayResponse({
    description: 'Não foi possível consultar ou interpretar a PokéAPI.',
  })
  findEvolution(
    @Param('idOrName') idOrName: string,
  ): Promise<EvolutionResponseDto> {
    return this.evolutionService.findEvolution(idOrName);
  }
}
