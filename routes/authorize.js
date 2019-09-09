var express = require("express");
var router = express.Router();

var authHelper = require("../helpers/auth");


router.get("/", async function (req, res, next) {
    const code = req.query.code;
    let data;

    if (code) {
        try {
            await authHelper.getTokenFromMS(code);
            data = await authHelper.getTokenFromDB();
            console.log("會不會先出現呢？");
            console.log(data);
            res.cookie('graph_access_token', data.aT, {
                maxAge: 3600000,
                httpOnly: true
            });
            res.cookie('graph_user_name', data.uN, {
                maxAge: 3600000,
                httpOnly: true
            });
            res.cookie('graph_refresh_token', data.rT, {
                maxAge: 7200000,
                httpOnly: true
            });
            res.cookie('graph_token_expires', data.eT, {
                maxAge: 3600000,
                httpOnly: true
            });
            // Redirect to home
            res.redirect('/');
        } catch (error) {
            res.render('error', {
                title: 'Error',
                message: 'Error exchanging code for token',
                error: {
                    status: "Cannot convert to token",
                    stack: error
                }
            });
        }

    } else {
        res.render("error", {
            title: 'Error',
            message: 'Authorization error',
            error: {
                status: 'Missing code parameter',
                stack: 'Missing code parameter'
            }
        });
    }
});

/* GET /authorize/signout */
router.get('/signout', function (req, res, next) {
    authHelper.clearCookies(res);

    // Redirect to home
    res.redirect('/');
});

module.exports = router;
