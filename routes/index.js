var express = require('express');
var router = express.Router();

var authHelper = require("../helpers/auth");

/* GET home page. */
//router.get('/', async function (req, res, next) {
//    let p = authHelper.getAuthUrl();
//    const accessToken = await authHelper.getNewAccessToken(req.cookies, res);
//    const userName = req.cookies.graph_user_name;
//    res.render('index', {
//        title: 'Home',
//        signInUrl: authHelper.getAuthUrl(),
//        active: {
//            home: true,
//            inbox: null
//        },
//        user: userName || false,
//        debug: `User: ${userName}\nAccess Token: ${accessToken}` || `$Sign in Url: ${authHelper.getAuthUrl()}`
//    });
//});

//router.get("/", function (req, res, next) {
//    let msLoginPage = authHelper.getAuthUrl();
//    console.log(msLoginPage);
//    res.send(msLoginPage);
//});



module.exports = router;
