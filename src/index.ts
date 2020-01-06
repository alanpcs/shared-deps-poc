import { WinstonLogger } from "./logger/winston-logger";

export const Logger = WinstonLogger;

export const hello = () => {
  return "world!";
};
