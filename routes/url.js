var express = require("express");
var router = express.Router();

var authHelper = require("../helpers/auth");

router.get("/", function (req, res, next) {
    let msLoginPage = authHelper.getAuthUrl();
    res.send(msLoginPage);
});

module.exports = router;
