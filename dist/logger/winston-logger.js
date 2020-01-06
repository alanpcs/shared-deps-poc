"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var sanitizer_1 = require("./sanitizer");
var myFormat = winston_1.format.printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp, ms = _a.ms, requestId = _a.requestId, stack = _a.stack;
    var entry = ms + " " + timestamp + " " + requestId + " [" + label + "] " + level + ": " + message;
    if (stack) {
        entry += "\n " + stack;
    }
    return entry;
});
var blacklistFields = ["access_token", "email", "document", "name"];
var sanitize = sanitizer_1.createSanitizer(blacklistFields);
var defaultOptions = {
    level: "info",
    format: winston_1.format.combine(winston_1.format.ms(), winston_1.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    }), winston_1.format.errors({ stack: true }), myFormat),
    transports: [
        new winston_1.transports.Console({
            silent: process.env.NODE_ENV === "test"
        })
    ]
};
var WinstonLogger = /** @class */ (function () {
    function WinstonLogger(defaultMeta) {
        this.meta = {};
        this.logger = winston_1.createLogger(__assign(__assign({}, defaultOptions), { defaultMeta: defaultMeta }));
    }
    WinstonLogger.prototype.info = function (label, message) {
        var entry = this.mergeEntry(message, { level: "info", label: label });
        this.logger.log(entry);
    };
    WinstonLogger.prototype.warn = function (label, message) {
        var entry = this.mergeEntry(message, { level: "warn", label: label });
        this.logger.log(entry);
    };
    WinstonLogger.prototype.error = function (label, message) {
        var entry = this.mergeEntry(message, { level: "error", label: label });
        this.logger.log(entry);
    };
    WinstonLogger.prototype.addMeta = function (meta) {
        this.meta = Object.assign({}, this.meta, meta);
    };
    WinstonLogger.prototype.mergeEntry = function (entry, logEntry) {
        if (typeof entry === "string") {
            return Object.assign({}, this.meta, { message: entry }, logEntry);
        }
        if (entry instanceof Error) {
            var stack = entry.stack, rest = __rest(entry, ["stack"]);
            return Object.assign({}, this.meta, logEntry, {
                message: JSON.stringify(sanitize(rest), null),
                stack: stack
            });
        }
        return Object.assign({}, this.meta, logEntry, {
            message: JSON.stringify(sanitize(entry), null)
        });
    };
    return WinstonLogger;
}());
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=winston-logger.js.map