'use strict';
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

/**
 * @function
 * @name consoleFormat
 * @description Format for the consol logs
 */
const consoleFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

/**
 * @function
 * @name loggerProd
 * @description A winston logger configuration for the
 * production use
 */
const loggerProd = createLogger({
    level: 'info',
    format: combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new transports.File({ filename: 'logs/all.log' })
    ]
});

/**
 * @function
 * @name loggerDev
 * @description A winston logger configuration for the
 * developement use
 */
const loggerDev = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new transports.File({ filename: 'logs/all.log' }),
        new transports.Console({
            format: format.combine(
                label({ label: (process.env.COBALT_NAME || 'COBALT-CORE') }),
                timestamp(),
                format.colorize(),
                consoleFormat
            )
        })
    ]
});

module.exports = function() {
    return (process.env.NODE_ENV === 'production') ? loggerProd : loggerDev;
};