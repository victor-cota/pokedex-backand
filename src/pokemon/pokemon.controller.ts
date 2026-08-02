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

import { PokemonResponseDto } from './dto/pokemon-response.dto';
import { PokemonService } from './pokemon.service';

@ApiTags('Pokémon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':idOrName')
  @ApiOperation({
    summary: 'Buscar um Pokémon',
    description:
      'Busca um Pokémon na PokéAPI pelo nome ou pelo número da Pokédex.',
  })
  @ApiParam({
    name: 'idOrName',
    description: 'Nome ou número do Pokémon',
    examples: {
      porNome: {
        summary: 'Busca pelo nome',
        value: 'pikachu',
      },
      porNumero: {
        summary: 'Busca pelo número',
        value: '25',
      },
    },
  })
  @ApiOkResponse({
    description: 'Pokémon encontrado com sucesso.',
    type: PokemonResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Nome ou número em formato inválido.',
  })
  @ApiNotFoundResponse({
    description: 'Pokémon não encontrado.',
  })
  @ApiBadGatewayResponse({
    description: 'Não foi possível consultar a PokéAPI.',
  })
  findOne(@Param('idOrName') idOrName: string): Promise<PokemonResponseDto> {
    return this.pokemonService.findOne(idOrName);
  }
}
