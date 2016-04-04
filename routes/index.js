var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('==============session',req.session.passport);
    if (!req.session.passport) return res.render('index'); 
    unirest.get('https://graph.facebook.com/' + req.session.passport.user.id + '?fields=picture.type(small)')
    .header('Authorization', 'Bearer ' + req.session.passport.user.token)
    .header('x-li-format', 'json')
    .end(function (response) {
        console.log('=============response body', JSON.parse(response.body));
      res.render('index', { profile: JSON.parse(response.body) });
    })


});

router.get('/logout', function(req, res, next) {
    req.session = null;
    res.redirect('/');
});

module.exports = router;
