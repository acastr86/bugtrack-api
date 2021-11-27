import dotenv from "dotenv";
import joi from "joi";

import logger from "./logger";

dotenv.config();

const envSchema = joi.object().keys({
    NODE_ENV: joi.string().valid('development', 'production').required(),
    PORT: joi.number().positive().required(),
    ORIGIN: joi.string().uri().required(),
    DATABASE_URL: joi.string().uri().required(),
    API_USER: joi.string().required(),
    API_PASSWORD: joi.string().required(),
}).unknown();

const { value: env, error } = envSchema.prefs({ errors:{ label: 'key' }}).validate(process.env);

if (error){
    logger.log.error( new Error(`Config validation error: ${error.message}`));
}

export default {nodeEnv: env.NODE_ENV, port: env.PORT, origin: env.ORIGIN, apiUser: env.API_USER, apiPassword: env.API_PASSWORD};