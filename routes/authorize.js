var express = require("express");
var router = express.Router();

var authHelper = require("../helpers/auth");

/* GET Access Token from MS */
router.get("/", async function (req, res, next) {
    /* After login, MS will return a auth_code to redirect page */
    const auth_code = req.query.code;

    if (auth_code) {
        try {
            await authHelper.getTokenFromMS(auth_code);
            res.redirect('/');
        } catch (error) {
            res.render('error', {
                message: 'Error exchanging code for token',
                error: {
                    status: "Cannot convert to token",
                    stack: error
                }
            });
        }

    } else {
        res.render("error", {
            message: 'Authorization error',
            error: {
                status: 'Missing code parameter',
                stack: 'Missing code parameter'
            }
        });
    }
});

module.exports = router;
