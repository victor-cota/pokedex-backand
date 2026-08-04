import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  // Application configuration
  PORT: Joi.number().port().default(3000),

  // PokeAPI configuration
  POKEAPI_BASE_URL: Joi.string().uri().required(),

  // Gemini API configuration
  GEMINI_API_KEY: Joi.string().trim().required(),
  GEMINI_MODEL: Joi.string().trim().default('gemini-3.6-flash'),

  // Database configuration
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().default(5432),
  DB_USERNAME: Joi.string()
    .pattern(/^[a-zA-Z_][a-zA-Z0-9_]*$/)
    .required(),
  DB_PASSWORD: Joi.string().min(12).required(),
  DB_DATABASE: Joi.string()
    .pattern(/^[a-zA-Z_][a-zA-Z0-9_]*$/)
    .required(),
  DB_LOGGING: Joi.boolean().default(false),
});
