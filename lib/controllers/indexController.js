'use strict';

const async = require('async'),
  lodash = require('lodash'),
  mongoose = require('mongoose'),
  qs = require('qs'),
  constants = require('../utils/constants'),
  logger = require('../tools/logger'),
  utils = require('../utils/utils');

exports.renderHomePage = function (req, res) {
  res.render('index', { title: 'Airbnb Clone Backend Utility' });
};
