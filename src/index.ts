import { WinstonLogger } from "./logger/winston-logger";
import { Logger } from "./logger/logger";

export { WinstonLogger, Logger };

export const hello = () => {
  return "world!";
};
