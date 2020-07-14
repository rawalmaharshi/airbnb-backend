'use strict';

const winston = require('winston'),
    config = require('config');

const level = config.get('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: () => {
                return new Date().toISOString;
            },
            stderrLevels: ['error', 'warn'],
            colorize: true
        })
    ]
});

module.exports = logger;