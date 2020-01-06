import {
  createLogger,
  format,
  transports,
  Logger as WLogger,
  LogEntry
} from "winston";
import { Logger } from "./logger";
import { createSanitizer } from "./sanitizer";

const myFormat = format.printf(
  ({ level, message, label, timestamp, ms, requestId, stack }) => {
    let entry = `${ms} ${timestamp} ${requestId} [${label}] ${level}: ${message}`;
    if (stack) {
      entry += `\n ${stack}`;
    }

    return entry;
  }
);

const blacklistFields = ["access_token", "email", "document", "name"];
const sanitize = createSanitizer(blacklistFields);

const defaultOptions = {
  level: "info",
  format: format.combine(
    format.ms(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    myFormat
  ),
  transports: [
    new transports.Console({
      silent: process.env.NODE_ENV === "test"
    })
  ]
};

export class WinstonLogger implements Logger {
  private logger: WLogger;
  private meta: Record<string, any>;

  constructor(defaultMeta?: any) {
    this.meta = {};
    this.logger = createLogger({
      ...defaultOptions,
      defaultMeta
    });
  }

  info(label: string, message: string | Record<string, any>): void {
    const entry = this.mergeEntry(message, { level: "info", label });
    this.logger.log(entry);
  }

  warn(label: string, message: string | Record<string, any>): void {
    const entry = this.mergeEntry(message, { level: "warn", label });
    this.logger.log(entry);
  }

  error(label: string, message: string | Record<string, any>): void {
    const entry = this.mergeEntry(message, { level: "error", label });
    this.logger.log(entry);
  }

  addMeta(meta: Record<string, any>) {
    this.meta = Object.assign({}, this.meta, meta);
  }

  private mergeEntry(
    entry: string | Record<string, any>,
    logEntry: Partial<LogEntry> & { level: string }
  ): LogEntry {
    if (typeof entry === "string") {
      return Object.assign({}, this.meta, { message: entry }, logEntry);
    }

    if (entry instanceof Error) {
      const { stack, ...rest } = entry;
      return Object.assign({}, this.meta, logEntry, {
        message: JSON.stringify(sanitize(rest), null),
        stack
      });
    }

    return Object.assign({}, this.meta, logEntry, {
      message: JSON.stringify(sanitize(entry), null)
    });
  }
}
