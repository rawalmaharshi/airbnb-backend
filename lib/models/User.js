'use strict';

const lodash = require('lodash'),
  mongoose = require('mongoose'),
  utils = require('../utils/utils'),
  constants = require('../utils/constants');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  email: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};