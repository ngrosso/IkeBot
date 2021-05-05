const winston = require('winston');
require('winston-daily-rotate-file');
const appRoot = require('app-root-path');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD/MM/YYYY-HH:mm:ss:SSS',
        }),
        winston.format.printf(({ timestamp, level, message, meta }) => {
            return `[${timestamp}] [${level}] | ${JSON.stringify(message)} ${meta? " | "+JSON.stringify(meta) : ''}`;
        })),
    transports: [
        new winston.transports.Console({json: true},{ 'timestamp': true }),
        new winston.transports.DailyRotateFile({
            filename: 'application-%DATE%.log',
            dirname: `${appRoot}/logs/`,
            level: 'info',
            handleExceptions: true,
            colorize: true,
            json: true,
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ], exitOnError: false
});

logger.info("Logger Created");

module.exports = logger;
