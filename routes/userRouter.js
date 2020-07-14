'use strict';

const express = require('express'),
  router = express.Router(),
  userController = require('../lib/controllers/userController'),
  authentication = require('../lib/tools/authentication');  //will add later

router.post('/getOrCreate', userController.getOrCreateUser);

module.exports = router;