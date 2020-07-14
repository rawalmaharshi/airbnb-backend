'use strict';

const async = require('async'),
  lodash = require('lodash'),
  mongoose = require('mongoose'),
  qs = require('qs'),
  constants = require('../utils/constants'),
  logger = require('../tools/logger'),
  utils = require('../utils/utils'),
  User = require('../models/User').User;

exports.getOrCreateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, gender } = req.body;
    let user = await User.findOne({ email });
    if (user === null) {
      //create new user
      user = new User({
        firstName,
        lastName,
        email,
        gender
      });
      await user.save();  //Some more work here is to be done, I'll do it later
      res.send(user.toJSON());
    }
  } catch (error) {
    next(error);
  }
};