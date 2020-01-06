import traverse from "traverse";

export const createSanitizer = (
  blacklist: string[] = [],
  redacted = "[REDACTED]"
) => (obj: Record<string, any>): Record<string, any> => {
  return traverse(obj).map(function() {
    if (blacklist.includes(this.key || "")) {
      this.update(redacted);
    }
  });
};
