const jwt = require('jsonwebtoken');


var admin = require("firebase-admin"); // load firebase
//Firebase Admin SDK secret's key path
var serviceAccount = require("../project-nodejs-todolist-firebase-adminsdk-twmhu-d7b2603e62.json");
//init firebase database
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-nodejs-todolist.firebaseio.com"
});
let fireData = admin.database();
let ref = fireData.ref("outlookBookingsApp");


const credentials = {
    client: {
        id: process.env.APP_ID,
        secret: process.env.APP_PASSWORD,
    },
    auth: {
        tokenHost: 'https://login.microsoftonline.com',
        authorizePath: 'common/oauth2/v2.0/authorize',
        tokenPath: 'common/oauth2/v2.0/token'
    }
};

const oauth2 = require('simple-oauth2').create(credentials);

function getAuthUrl() {
    const returnVal = oauth2.authorizationCode.authorizeURL({
        redirect_uri: process.env.REDIRECT_URI,
        scope: process.env.APP_SCOPES
    });
    console.log(`Generated auth url: ${returnVal}`);
    return returnVal;
}

function clearCookies(res) {
    // Clear cookies
    res.clearCookie('graph_access_token', {
        maxAge: 3600000,
        httpOnly: true
    });
    res.clearCookie('graph_user_name', {
        maxAge: 3600000,
        httpOnly: true
    });
    res.clearCookie('graph_refresh_token', {
        maxAge: 7200000,
        httpOnly: true
    });
    res.clearCookie('graph_token_expires', {
        maxAge: 3600000,
        httpOnly: true
    });
}

async function getTokenFromCode(auth_code) {
    let result = await oauth2.authorizationCode.getToken({
        code: auth_code,
        redirect_uri: process.env.REDIRECT_URI,
        scope: process.env.APP_SCOPES
    });

    const token = oauth2.accessToken.create(result);
    const tokens = token.token;
    //    console.log("這邊是token資料群");
    const eTime = tokens.expires_at.getTime();
    console.log(eTime);
    ref.push({
        accessToken: tokens.access_token,
        expiredTime: eTime,
        idToken: tokens.id_token,
        refreshToken: tokens.refresh_token,
    });
    //console.log('Token created: ', token.token);
    //saveValuesToCookie();
    return token.token;
}

async function getTokenFromDatabase() {
    let tokensFromFirebase = {};
    await ref.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            let tokens = childSnapshot.val();
            // Parse the identity token
            const user = jwt.decode(tokens.idToken);
            tokensFromFirebase.aT = tokens.accessToken;
            tokensFromFirebase.uN = user.name;
            tokensFromFirebase.rT = tokens.refreshToken;
            tokensFromFirebase.eT = tokens.expiredTime;
        });
    });

    return tokensFromFirebase;
}

async function getNewAccessToken(cookies, res) {
    // Do we have an access token cached?
    let token = cookies.graph_access_token;

    if (token) {
        // We have a token, but is it expired?
        // Expire 5 minutes early to account for clock differences
        const FIVE_MINUTES = 300000;
        const expiration = new Date(parseFloat(cookies.graph_token_expires - FIVE_MINUTES));
        if (expiration > new Date()) {
            // Token is still good, just return it
            return token;
        }
    }

    // Either no token or it's expired, do we have a
    // refresh token?
    const refresh_token = cookies.graph_refresh_token;
    if (refresh_token) {
        const newToken = await oauth2.accessToken.create({
            refresh_token: refresh_token
        }).refresh();
        //saveValuesToCookie(newToken, res);
        return newToken.token.access_token;
    }

    // Nothing in the cookies that helps, return empty
    return null;
}


async function getNewAccessTokenDB(data) {
    // Do we have an access token cached?
    let token = data.aT;

    if (token) {
        // We have a token, but is it expired?
        // Expire 5 minutes early to account for clock differences
        const FIVE_MINUTES = 300000;
        const expiration = new Date(parseFloat(data.eT - FIVE_MINUTES));
        if (expiration > new Date()) {
            // Token is still good, just return it
            return token;
        }
    }

    // Either no token or it's expired, do we have a
    // refresh token?
    const refresh_token = data.rT;
    if (refresh_token) {
        const newToken = await oauth2.accessToken.create({
            refresh_token: refresh_token
        }).refresh();
        return newToken.token.access_token;
    }

    // Nothing in the cookies that helps, return empty
    return null;
}



exports.getAuthUrl = getAuthUrl;

exports.clearCookies = clearCookies;

exports.getTokenFromMS = getTokenFromCode;

exports.getTokenFromDB = getTokenFromDatabase;

exports.getNewAccessToken = getNewAccessToken;

exports.getNewAccessTokenDB = getNewAccessTokenDB;
