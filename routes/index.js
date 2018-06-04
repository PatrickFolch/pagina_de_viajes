var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Viaja!' });
});

router.get('/quienessomos', function(req, res, next) {
  res.render('quienessomos', { title: 'QUIENES SOMOS' });
});

router.get('/destinos', function(req, res, next) {
  res.render('destinos', { title: 'DESTINOS' });
});

router.get('/dondeestamos', function(req, res, next) {
  res.render('dondeestamos', { title: 'Donde Estamos' });
});

module.exports = router;
