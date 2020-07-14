'use strict';

const express = require('express'),
  router = express.Router(),
  indexController = require('../lib/controllers/indexController');

router.get('/', indexController.renderHomePage);

module.exports = router;