const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../utils/errors');
const logger = require('../utils/logger');

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof BadRequestError || error instanceof NotFoundError) {
    return res.status(error.status).send(error.text);
  }
  res.sendStatus(INTERNAL_SERVER_ERROR);
  logger.error({
    message: { stack: error.stack }
  });
  next(error);
};

module.exports = errorMiddleware;
