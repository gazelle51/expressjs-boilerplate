/**
 * Add an optional traceID field to express requests.
 */
declare namespace Express {
  export interface Request {
    traceID?: string;
  }
}

/**
 * Extend ExpressValidator.Record so that errors can be handled.
 */
declare namespace ExpressValidator {
  export interface Record {
    [key: string]: { msg?: string };
  }
}
