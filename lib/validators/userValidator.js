'use strict';

const constants = require('../utils/constants'),
  Joi = require('joi'),
  mongoIdRegex = /^[0-9a-fA-F]{24}$/;

exports.getOrCreate = (req) => {
  req.checkBody('firstName').notEmpty();
  req.checkBody('lastName').notEmpty();
  req.checkBody('gender').notEmpty();
  req.checkBody('email').notEmpty();
  return req.getValidationResult();
};

