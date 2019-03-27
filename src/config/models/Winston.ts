import {
  FileTransportOptions,
  ConsoleTransportOptions
} from "winston/lib/winston/transports";

/**
 * Options for Winston logs.
 */
export type LogOptions = {
  fileDebug: FileTransportOptions;
  file: FileTransportOptions;
  consoleDebug: ConsoleTransportOptions;
  consoleDev: ConsoleTransportOptions;
  consoleProd: ConsoleTransportOptions;
};
