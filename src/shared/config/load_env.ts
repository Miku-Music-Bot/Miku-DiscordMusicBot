import path from 'path';
import dotenv from 'dotenv';

/**
 * validateEnv()
 * Checks that required env variables are defined correctly, throws an error if not
 * @param env - NodeJS ProcessEnv object
 */
export function validateEnv(env: NodeJS.ProcessEnv) {
  if (env.APP_NAMESPACE === undefined) throw Error('`APP_NAMESPACE` not defined in environment');
}

/**
 * loadEnv()
 * Loads .env file into process.env and then validates it, throws error if invalid
 */
export function loadEnv() {
  dotenv.config({ path: path.join(__dirname, '..', '..', '..', '..', '.env'), override: true });
  validateEnv(process.env);
}
