import Profiler, { LevelThresholds } from './profiler';

/**
 * Logger()
 * A winston logger wrapper
 */
export default class Logger {
  /**
   * @param name - Name of logger
   */
  constructor(name: string) {
    //
  }

  /**
   * releaseFiles()
   * Releases the log files and stops writing logs
   */
  releaseFiles() {
    //
  }

  /**
   * fatal() - For messages about irrecoverable errors
   * @param msg - message to log
   * @param error - optional error message
   */
  fatal(msg: string, error?: Error) {
    //
  }

  /**
   * error() - For messages about recoverable errors
   * @param msg - message to log
   * @param error - optional error message
   */
  error(msg: string, error?: Error) {
    //
  }

  /**
   * warn() - For messages about something that doesn't impact operation but may indicate a problem if it continues
   * @param msg - message to log
   * @param error - optional error message
   */
  warn(msg: string, error?: Error) {
    //
  }

  /**
   * info() - For general messages that tell what the program is doing
   * @param msg - message to log
   */
  info(msg: string) {
    //
  }

  /**
   * debug() - For detailed messages that tell what the program is doing
   * @param msg - message to log
   */
  debug(msg: string) {
    //
  }

  /**
   * profile() - Starts a profiler with given name
   * @param name - name of task to profile
   * @param level_thresholds - optional thresholds for severity of logs (in milliseconds)
   */
  profile(name: string, level_thresholds?: LevelThresholds): Profiler {
    return new Profiler(this, name, level_thresholds);
  }
}
