import { z } from 'zod';

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/u)
    .filter((word) => word.length > 0).length;
}

export const geminiNarrationJsonSchema = {
  type: 'object',
  additionalProperties: false,

  properties: {
    categoriaTraduzida: {
      type: 'string',
      description:
        'Categoria traduzida para português, começando com a palavra Pokémon.',
      minLength: 3,
      maxLength: 80,
    },

    descricaoTraduzida: {
      type: 'string',
      description:
        'Descrição em português simples, agradável e baseada somente nos dados fornecidos.',
      minLength: 1,
      maxLength: 1000,
    },
  },

  required: ['categoriaTraduzida', 'descricaoTraduzida'],
};

export const geminiNarrationSchema = z
  .object({
    categoriaTraduzida: z.string().trim().min(3).max(80),

    descricaoTraduzida: z.string().trim().min(1).max(1000),
  })
  .strict()
  .superRefine((result, context) => {
    const wordCount = countWords(result.descricaoTraduzida);

    if (wordCount < 40 || wordCount > 100) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['descricaoTraduzida'],
        message: 'A descrição deve possuir entre 40 e 100 palavras.',
      });
    }
  });

export type GeminiNarrationResult = z.infer<typeof geminiNarrationSchema>;
