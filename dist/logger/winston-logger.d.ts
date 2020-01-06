import { Logger } from "./logger";
export declare class WinstonLogger implements Logger {
    private logger;
    private meta;
    constructor(defaultMeta?: any);
    info(label: string, message: string | Record<string, any>): void;
    warn(label: string, message: string | Record<string, any>): void;
    error(label: string, message: string | Record<string, any>): void;
    addMeta(meta: Record<string, any>): void;
    private mergeEntry;
}
