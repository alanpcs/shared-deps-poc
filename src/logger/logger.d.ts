export interface Logger {
  addMeta(meta: Record<string, any>): void;
  info(label: string, message: string | Record<string, any>): void;
  warn(label: string, message: string | Record<string, any>): void;
  error(label: string, message: string | Record<string, any>): void;
}
