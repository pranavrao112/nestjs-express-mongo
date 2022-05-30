import * as winston from 'winston';
let createLogger: winston.Logger;

export class Logger {
    private winston: any;
    Logger: any;
    private logPerfix: string;
    constructor(logPrefix: string) {
        this.logPerfix = logPrefix;
        this.winston = this.createLogger();
    }
    createLogger(): any {
        if (createLogger) {
            return createLogger;
        } else {
            createLogger = winston.createLogger({
                levels: {
                    critical: 0,
                    error: 1,
                    info: 3,
                    trace: 4,
                    debug: 5
                },
                silent: false,
                transports: [
                    new winston.transports.Console({
                        format: winston.format.simple(),
                        level: process.env.LOG_LEVEL || 'info'
                    })
                ]
            });
            return createLogger;
        }
    }

    debug(message: string, properties?: any | undefined): void {
        this.winston.info(message, properties);
    }

    info(message: string, properties?: any | undefined): void {
        this.winston.info(message, properties);
    }

    trace(message: string, properties?: any | undefined): void {
        this.winston.trace(message, properties);
    }

    error(message: string, properties?: any | undefined): void {
        this.winston.error(message, properties);
    }

    critical(properties: { [index: string]: any }): void {
        this.winston.critical('Uncaught Exception', properties);
    }
}

module.exports = {
    Logger
};
