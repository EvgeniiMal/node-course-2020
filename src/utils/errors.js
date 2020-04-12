const { NOT_FOUND, BAD_REQUEST, getStatusText } = require('http-status-codes');

class BadRequestError extends Error {
  constructor() {
    super();
    this.status = BAD_REQUEST;
    this.text = getStatusText(this.status);
  }
}

class NotFoundError extends Error {
  constructor() {
    super();
    this.status = NOT_FOUND;
    this.text = getStatusText(this.status);
  }
}
module.exports = { BadRequestError, NotFoundError };
