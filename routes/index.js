var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('==============session',req.session.passport);
    // if(req.isAuthenticated()) {
    // unirest.get('https://graph.facebook.com/'+ req.session.passport.id +'/picture?type=large')
    // unirest.get('https://graph.facebook.com/' + req.session.passport.id +'?picture&amp;access_token='+process.env.FACEBOOK_APP_ID+'|'+process.env.FACEBOOK_APP_SECRET+'')
  //     .header('Authorization', 'Bearer ' + req.user.token)
  //     .header('x-li-format', 'json')
  //     .end(function (response) {
  //         console.log('=============response body', response.body);
  //       res.render('index', { profile: response.body });
  //     })
  // } else {
  // FB.api('/10154086711753185', 'get', {fields: 'picture'}, function (res){
  //     if(res) {
  //         console.log(res);
  //         res.render('index');
  //
  //     } else {
          res.render('index');

    //   }
  // })

});

router.get('/logout', function(req, res, next) {
    req.session = null;
    res.redirect('/');
});

module.exports = router;
