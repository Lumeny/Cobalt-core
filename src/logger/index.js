'use strict';
const winston = require('winston');

class Logger {
    constructor() {
        this.production = (process.env.NODE_ENV === 'production');
        this.console = winston.createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            ),
            defaultMeta: { service: 'your-service-name' },
            transports: [
                //
                // - Write to all logs with level `info` and below to `combined.log`
                // - Write all logs error (and below) to `error.log`.
                //
                new transports.File({ filename: 'quick-start-error.log', level: 'error' }),
                new transports.File({ filename: 'quick-start-combined.log' })
            ]
        });
    }
}

module.exports = Logger;