import { loadEnv } from './load_env';

loadEnv();

export type IPC_Config = {
  readonly app_namespace: string;
  readonly silent: boolean;
};
export const IPC_CONFIG: IPC_Config = Object.freeze({
  app_namespace: 'miku-music-bot',
  silent: true,
});
