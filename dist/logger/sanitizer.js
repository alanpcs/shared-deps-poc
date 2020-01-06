"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var traverse_1 = __importDefault(require("traverse"));
exports.createSanitizer = function (blacklist, redacted) {
    if (blacklist === void 0) { blacklist = []; }
    if (redacted === void 0) { redacted = "[REDACTED]"; }
    return function (obj) {
        return traverse_1.default(obj).map(function () {
            if (blacklist.includes(this.key || "")) {
                this.update(redacted);
            }
        });
    };
};
//# sourceMappingURL=sanitizer.js.map