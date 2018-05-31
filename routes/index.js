var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VIAJA CON PATATA TRAVEL!!!!' });
});

router.get('/quienessomos', function(req, res, next) {
  res.render('quienessomos', { title: 'QUIENES SOMOS' });
});

router.get('/contactos', function(req, res, next) {
  res.render('contactos', { title: 'CONTACTOS' });
});

module.exports = router;
