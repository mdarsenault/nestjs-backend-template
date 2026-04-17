import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('production'),

  DATABASE_PORT: Joi.number().port().default(5432).optional(),
  DATABASE_HOST: Joi.string().optional(),
  DATABASE_NAME: Joi.string().optional(),
  DATABASE_USER: Joi.string().optional(),
  DATABASE_PASSWORD: Joi.string().optional(),

  DATABASE_URL: Joi.string().allow('').optional(),

  // LLM
  LLM_OPENAI_API_KEY: Joi.string().required(),
  LLM_GEMINI_API_KEY: Joi.string().required(),
  LLM_GROK_API_KEY: Joi.string().required(),
});
