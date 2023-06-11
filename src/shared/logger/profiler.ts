import Logger from './logger';

export type LevelThresholds = {
  debug?: number;
  info?: number;
  warn?: number;
  error?: number;
  fatal?: number;
};

/**
 * Profiler()
 * Tracks running time of a task starting from creation to when stop() is called
 * Logs a message once stop() is called
 */
export default class Profiler {
  /**
   * @param logger - logger to log message to
   * @param name - name of task to profile
   * @param level_thresholds - optional thresholds for severity of logs (in milliseconds)
   */
  constructor(logger: Logger, name: string, level_thresholds?: LevelThresholds) {
    //
  }

  /**
   * stop() - Stops profiling task and logs a message
   * @param options - optional options for how to log message
   * @param options.message - custom message to log (overrides auto generated message)
   * @param options.success - if task was successful or not (default is true)
   * @param options.level - log level of message (overrides auto generated log level from level_thresholds)
   * @returns duration of task (in milliseconds)
   */
  stop(options?: { message?: string; success?: boolean; level?: 'debug' | 'info' | 'warn' | 'error' | 'fatal' }): number {
    return 0;
  }
}
