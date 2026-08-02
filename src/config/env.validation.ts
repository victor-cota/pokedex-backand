import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  POKEAPI_BASE_URL: Joi.string().uri().required(),

  GEMINI_API_KEY: Joi.string().trim().required(),

  GEMINI_MODEL: Joi.string().trim().default('gemini-3.6-flash'),
});
