import { z } from 'zod';

export const geminiIdentificationJsonSchema = {
  type: 'object',
  additionalProperties: false,

  properties: {
    pokemonEncontrado: {
      type: 'boolean',
      description:
        'Verdadeiro somente quando um Pokémon foi identificado com segurança.',
    },

    nome: {
      type: ['string', 'null'],
      description:
        'Nome oficial provável do Pokémon em letras minúsculas ou null.',
    },

    numeroPokedexNacional: {
      type: ['integer', 'null'],
      description: 'Número provável na Pokédex Nacional ou null.',
      minimum: 1,
    },

    confianca: {
      type: 'number',
      description: 'Confiança estimada para a identificação, entre 0 e 1.',
      minimum: 0,
      maximum: 1,
    },

    observacao: {
      type: 'string',
      description:
        'Observação curta sobre as características visuais consideradas.',
      minLength: 1,
      maxLength: 200,
    },
  },

  required: [
    'pokemonEncontrado',
    'nome',
    'numeroPokedexNacional',
    'confianca',
    'observacao',
  ],
};

export const geminiIdentificationSchema = z
  .object({
    pokemonEncontrado: z.boolean(),

    nome: z.string().trim().min(1).nullable(),

    numeroPokedexNacional: z.number().int().positive().nullable(),

    confianca: z.number().min(0).max(1),

    observacao: z.string().trim().min(1).max(200),
  })
  .strict()
  .refine(
    (result) =>
      !result.pokemonEncontrado ||
      (result.nome !== null && result.numeroPokedexNacional !== null),
    {
      message: 'Nome e número são obrigatórios quando um Pokémon é encontrado.',
      path: ['nome'],
    },
  )
  .refine(
    (result) =>
      result.pokemonEncontrado ||
      (result.nome === null && result.numeroPokedexNacional === null),
    {
      message:
        'Nome e número devem ser nulos quando nenhum Pokémon é encontrado.',
      path: ['nome'],
    },
  );

export type GeminiIdentificationResult = z.infer<
  typeof geminiIdentificationSchema
>;
