const { createLogger, format, transports } = require('winston');

const myCustomLevels = {
  levels: {
    promise: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    verbose: 5,
    debug: 6,
    silly: 7
  },
  colors: {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
  }
};

const logger = createLogger({
  levels: myCustomLevels.levels,
  transports: [
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      )
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      )
    }),
    new transports.File({
      filename: 'exceptions.log',
      level: 'promise',
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      )
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'exceptions.log'
    })
  ]
});

logger.exceptions.handle();

module.exports = logger;
