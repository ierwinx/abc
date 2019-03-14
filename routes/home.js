var logger = require('log4js').getLogger("Home");
var express = require('express');
var router = express.Router();
var utils = require('../helpers/utils');

router.get('/', function(req, res, next) {
    res.render('home');
});

module.exports = router;
