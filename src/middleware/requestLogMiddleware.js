const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const { method, path, query, body } = req;
  logger.info(
    `method: ${method}, url: ${path},
     query params: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`
  );
  next();
};

module.exports = requestLogger;
