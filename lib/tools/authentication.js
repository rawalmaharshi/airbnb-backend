'use strict';

const config = require('config'),
  jwt = require('jsonwebtoken'),
  utils = require('../utils/utils'),
  constants = require('../utils/constants');

const secret = config.get('jwtSecret');


exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token && token.split(' ').length > 0 && token.split(' ')[0].toLowerCase() === 'bearer') {
    jwt.verify(token.split(' ')[1], secret, (err, decoded) => {
      if (err) {
        err.status = 401;
        err.errorCode = '1001';
        next(err);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    next(utils.createError('1001', 401));
  }
};

/**
 * 
 * @param {String} userId 
 * @param {String} email
 * @returns {String} jwt token
 */
exports.generateToken = (userId, email) => {
  const expiresIn = '30d';
  return jwt.sign({
    user: userId,
    email
  },
    secret,
    {
      algorithm: constants.jwtAlgorithm,
      expiresIn
    });
};