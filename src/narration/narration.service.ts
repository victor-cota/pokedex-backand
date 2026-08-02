import { Injectable } from '@nestjs/common';

import { GeminiService } from '../gemini/gemini.service';
import { PokemonResponseDto } from '../pokemon/dto/pokemon-response.dto';
import { NarrationResultDto } from './dto/narration-result.dto';

@Injectable()
export class NarrationService {
  constructor(private readonly geminiService: GeminiService) {}

  async createNarration(
    pokemon: PokemonResponseDto,
  ): Promise<NarrationResultDto> {
    const prompt = this.buildPrompt(pokemon);

    const geminiResult = await this.geminiService.createNarration(prompt);

    const category = this.normalizeCategory(geminiResult.categoriaTraduzida);

    const description = this.normalizeSentence(geminiResult.descricaoTraduzida);

    const pokemonName = this.formatPokemonName(pokemon.nome);

    const descriptionForSpeech = this.lowercaseFirstCharacter(description);

    return {
      categoriaPortugues: category,
      descricaoPortugues: description,
      textoParaNarracao:
        `${pokemonName}, o ${category}, ` + `${descriptionForSpeech}`,
    };
  }

  private buildPrompt(pokemon: PokemonResponseDto): string {
    const abilities = pokemon.habilidades
      .map((ability) => ability.nome)
      .join(', ');

    const descriptionBase =
      pokemon.descricaoBase ?? 'Descrição-base não disponível.';

    const categoryBase = pokemon.categoria ?? 'Categoria não disponível.';

    return `
Traduza e adapte os dados abaixo.

Use somente os dados fornecidos.

DADOS OFICIAIS:

Nome:
${pokemon.nome}

Categoria original:
${categoryBase}

Descrição-base:
${descriptionBase}

Idioma da descrição-base:
${pokemon.idiomaDescricaoBase ?? 'não informado'}

Tipos:
${pokemon.tipos.join(', ')}

Altura em metros:
${pokemon.alturaMetros}

Peso em quilogramas:
${pokemon.pesoQuilos}

Habilidades:
${abilities || 'não informadas'}

É lendário:
${pokemon.lendario ? 'sim' : 'não'}

É mítico:
${pokemon.mitico ? 'sim' : 'não'}

É bebê:
${pokemon.bebe ? 'sim' : 'não'}

REGRAS DA RESPOSTA:

1. categoriaTraduzida deve começar com "Pokémon".
2. descricaoTraduzida deve possuir entre 40 e 100 palavras.
3. Não comece a descrição repetindo o nome do Pokémon.
4. Não repita a categoria dentro da descrição.
5. Não invente informações.
6. Use português simples e agradável para leitura em voz alta.
7. Não use listas, títulos ou Markdown.
    `.trim();
  }

  private normalizeCategory(category: string): string {
    let normalizedCategory = category
      .replace(/\s+/gu, ' ')
      .trim()
      .replace(/[.!?,;:]+$/gu, '')
      .replace(/^(o|a)\s+/iu, '');

    normalizedCategory = normalizedCategory.replace(/^pokemon\b/iu, 'Pokémon');

    if (!/^Pokémon\b/iu.test(normalizedCategory)) {
      normalizedCategory = `Pokémon ${normalizedCategory}`;
    }

    return normalizedCategory;
  }

  private normalizeSentence(text: string): string {
    const normalizedText = text
      .replace(/\s+/gu, ' ')
      .trim()
      .replace(/[.!?]+$/gu, '');

    return `${normalizedText}.`;
  }

  private formatPokemonName(name: string): string {
    if (!name) {
      return name;
    }

    return name.charAt(0).toLocaleUpperCase('pt-BR') + name.slice(1);
  }

  private lowercaseFirstCharacter(text: string): string {
    if (!text) {
      return text;
    }

    return text.charAt(0).toLocaleLowerCase('pt-BR') + text.slice(1);
  }
}
