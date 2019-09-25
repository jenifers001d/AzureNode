var express = require("express");
var router = express.Router();

var authHelper = require("../helpers/auth");

//// Create a MS graph client and get data with api
var graph = require("@microsoft/microsoft-graph-client");
require("es6-promise").polyfill();
require("isomorphic-fetch");
////

let path;
/* GET Access Token from Database and data from MS*/
router.get("/", async function (req, res, next) {
    path = "outlookBookingsApp";
    // get tokens from database
    let data = await authHelper.getTokenFromDB(path);
    // check access token is expired or not and refresh
    const accessToken = await authHelper.getNewAccessTokenDB(data);
    let parms = {
        business: null,
        services: null,
        events: null,
    };

    if (accessToken) {
        //Initialize Graph client
        const client = graph.Client.init({
            authProvider: done => {
                done(null, accessToken);
            },
        });

        try {
            //Get the 10 newest messages from inbox
            const business = await client
                .api("/bookingBusinesses/" + process.env.ORG_ID)
                .select("businessHours,schedulingPolicy")
                .version("beta")
                .get();
            const service = await client
                .api("/bookingBusinesses/" + process.env.ORG_ID + "/services")
                .select("displayName,defaultDuration")
                .version("beta")
                .get();
            const event = await client
                .api("/bookingBusinesses/" + process.env.ORG_ID + "/calendarView")
                .select("serviceName,serviceId,duration,start,end")
                .version("beta")
                .get();
            //parms.business = JSON.stringify(business, null, 2);
            //parms.services = JSON.stringify(service, null, 2);
            //parms.events = JSON.stringify(event.value, null, 2);
            parms.business = business;
            parms.services = service;
            parms.events = event.value;
            res.send(JSON.stringify(parms));
        } catch (err) {
            console.log(err.code);
            console.log(err.message);

            parms.message = "Error retrieving messages";
            parms.error = {
                status: `${err.code}: ${err.message}`,
                stack: JSON.stringify(err.body, null, 2),
            };
            res.render("error", parms);
        }
    } else {
        // Redirect to home
        res.send(JSON.stringify(parms));
    }
});

/*POST data to MS*/
router.post("/", async function (req, res) {
    let data = await authHelper.getTokenFromDB(path);
    const accessToken = await authHelper.getNewAccessTokenDB(data);
    const client = graph.Client.init({
        authProvider: done => {
            done(null, accessToken);
        },
    });

    try {
        let resText = await client.api("/bookingBusinesses/" + process.env.ORG_ID + "/appointments")
            .version('beta')
            .post(req.body);

        console.log(resText);
        res.send(resText);

    } catch (err) {
        let parms = {};
        console.log(err.code);
        console.log(err.message);

        //        parms.message = "Error retrieving messages";
        //        parms.error = {
        //            status: `${err.code}: ${err.message}`,
        //            stack: JSON.stringify(err.body, null, 2),
        //        };
        //        res.render("error", parms);
        res.send(JSON.stringify(err, null, 2));
    }
});

module.exports = router;
