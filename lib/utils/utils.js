'use strict';

const Joi = require('joi'),
  errorCodes = require('./errorCodes');

/**
 * @param {String} [errorCode]
 * @param {Number} [statusCode]
 * @param {String | Object} [message]
 * @return {Error}
 */
exports.createError = (errorCode, statusCode, message) => {
  const errMessage = message === undefined ? errorCodes[errorCode] : typeof message === 'object' ? JSON.stringify(message) : message;
  const err = new Error(errMessage);
  err.isObject = typeof message === 'object';
  err.status = statusCode;
  err.errorCode = errorCode;
  return err;
};
