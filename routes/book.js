var express = require("express");
var router = express.Router();

var authHelper = require("../helpers/auth");
var graph = require("@microsoft/microsoft-graph-client");
require("es6-promise").polyfill();
require("isomorphic-fetch");

//import { UserAgentApplication } from "msal";
//import { ImplicitMSALAuthenticationProvider } from "./node_modules/@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";


/* GET Access Token */
router.get("/", async function (req, res, next) {
    // get tokens from database
    let data = await authHelper.getTokenFromDB();
    // check access token is expired or not and refresh
    const accessToken = await authHelper.getNewAccessTokenDB(data);
    let parms = {
        business: null,
        services: null,
        events: null,
    };

    //res.send(data);
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
                //.select("subject,from,receivedDateTime,isRead")
                //.select("subject,start,end")
                //.orderby("receivedDateTime DESC")
                //.orderby("start/dateTime DESC")
                .api("/bookingBusinesses/" + process.env.ORG_ID + "/services")
                .select("displayName,defaultDuration")
                .version("beta")
                .get();
            const event = await client
                .api("/bookingBusinesses/" + process.env.ORG_ID + "/calendarView")
                .select("serviceName,serviceId,duration,start,end")
                .version("beta")
                .get();
            parms.business = business;
            parms.services = service;
            parms.events = event.value;

            res.send(JSON.stringify(parms, null, 2));
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
        res.redirect("/");
    }
    /* store access token and refresh token in cookie
    await res.cookie("graph_access_token", data.aT, {
        maxAge: 3600000,
        httpOnly: true,
    });
    await res.cookie("graph_user_name", data.uN, {
        maxAge: 3600000,
        httpOnly: true,
    });
    await res.cookie("graph_refresh_token", data.rT, {
        maxAge: 7200000,
        httpOnly: true,
    });
    await res.cookie("graph_token_expires", data.eT, {
        maxAge: 3600000,
        httpOnly: true,
    });
    */
    //res.redirect("/book/mainPage");

});

/*POST data to MS*/
router.post("/makeBook", async function (req, res) {
    let data = await authHelper.getTokenFromDB();
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

/* LEGACY */
router.get("/mainPage", async function (req, res, next) {
    const accessToken = await authHelper.getNewAccessToken(req.cookies, res);
    const userName = req.cookies.graph_user_name;
    let parms = {
        title: "Inbox",
        debug: false,
    };

    //   const msalConfig = {
    //     auth: {
    //       clientId: "your_client_id", // Client Id of the registered application
    //       redirectUri: "your_redirect_uri",
    //     },
    //   };
    //   const graphScopes = ["user.read", "mail.send"];

    //   const msalApplication = new UserAgentApplication(msalConfig);
    //   const options = new MicrosoftGraph.MSALAuthenticationProviderOptions(
    //     graphScopes
    //   );
    //   const authProvider = new ImplicitMSALAuthenticationProvider(
    //     msalApplication,
    //     options
    //   );

    //從這邊開始從這邊開始從這邊開始從這邊開始從這邊開始從這邊開始從這邊開始
    if (accessToken && userName) {
        parms.user = userName;

        //Initialize Graph client
        const client = graph.Client.init({
            authProvider: done => {
                done(null, accessToken);
            },
        });

        try {
            //Get the 10 newest messages from inbox
            const result = await client
                //.api("/me/mailFolders/inbox/messages")
                //.api("/me/events")
                //.top(10)
                //.select("subject,from,receivedDateTime,isRead")
                //.select("subject,start,end")
                //.orderby("receivedDateTime DESC")
                //.orderby("start/dateTime DESC")
                //.api("/bookingBusinesses/" + process.env.ORG_ID + "/services")
                .api("/me/events")
                .top(10)
                //.version("beta")
                .get();

            parms.debug = `Graph request returned: ${JSON.stringify(
          result,
          null,
          2
        )}`;
            res.render("bookPage", parms);
        } catch (err) {
            parms.message = "Error retrieving messages";
            parms.error = {
                status: `${err.code}: ${err.message}`,
                stack: JSON.stringify(err.body, null, 2),
            };
            res.render("error", parms);
        }
        //        res.render("bookPage", parms);
        res.send(JSON.stringify(parms));
    } else {
        // Redirect to home
        res.redirect("/");
    } //到這邊為止到這邊為止到這邊為止到這邊為止到這邊為止*/

});

module.exports = router;
