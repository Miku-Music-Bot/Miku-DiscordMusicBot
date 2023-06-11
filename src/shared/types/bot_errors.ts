/**
 * NonFatalError
 * A error that should not crash the program
 */
export class NonFatalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NonFatalError';
  }
}

/**
 * InternalError
 * Non-fatal interal error that prevents execution of user's intentions
 * Should not be thrown for invalid user input
 */
export class InternalError extends NonFatalError {
  private _tooltip: string | undefined;
  private _notify_global: boolean | undefined;

  /**
   * returns tooltip message if given, error message if not
   */
  get tooltip() {
    return this._tooltip ? this._tooltip : this.message;
  }

  /**
   * returns notify_global flag
   */
  get notify_global() {
    return this._notify_global ? true : false;
  }

  /**
   * @param message - Error message
   * @param tootip - User friendly tooltip to display to user
   * @param notify_global - Flag for if guild should be notified of error
   */
  constructor(message: string, tootip?: string, notify_global?: boolean) {
    super(message);
    this.name = 'InternalError';
    this._tooltip = tootip;
    this._notify_global = notify_global;
  }
}

/**
 * UserError
 * Non-fatal error caused by invalid user input
 */
export class UserError extends NonFatalError {
  private _tooltip: string | undefined;
  private _notify_global: boolean | undefined;

  /**
   * returns tooltip message if given, error message if not
   */
  get tooltip() {
    return this._tooltip ? this._tooltip : this.message;
  }

  /**
   * returns notify_global flag
   */
  get notify_global() {
    return this._notify_global ? true : false;
  }

  /**
   * @param message - Error message
   * @param tootip - User friendly tooltip to display to user
   * @param notify_global - Flag for if guild should be notified of error
   */
  constructor(message: string, tootip?: string, notify_global?: boolean) {
    super(message);
    this.name = 'UserError';
    this._tooltip = tootip;
    this._notify_global = notify_global;
  }
}
