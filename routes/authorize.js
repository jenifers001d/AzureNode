var express = require("express");
var router = express.Router();

var authHelper = require("../helpers/auth");

/* GET Access Token from MS */
router.get("/", async function (req, res, next) {
    const code = req.query.code;

    if (code) {
        try {
            await authHelper.getTokenFromMS(code);
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
