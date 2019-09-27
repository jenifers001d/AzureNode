var jwt = require('jsonwebtoken');

// Prepare firebase
const firebaseDb = require("../connections/firebase_admin");
let ref;


//// OAuth2 lets users grant the access to the desired resources to
//// third party applications, giving them the possibility to enable
//// and disable those accesses whenever they want.
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
////

/* Create a MS login page URL */
function getAuthUrl() {
    const returnVal = oauth2.authorizationCode.authorizeURL({
        redirect_uri: process.env.REDIRECT_URI,
        scope: process.env.APP_SCOPES
    });
    console.log(`Generated auth url: ${returnVal}`);
    return returnVal;
}

/* After login, MS will return a auth_code for OAuth2 */
/* By OAuth2 mechanism, retrieve access token and refresh token */
/* Store tokens into firebase */
async function getTokenFromMS(auth_code) {
    let result = await oauth2.authorizationCode.getToken({
        code: auth_code,
        redirect_uri: process.env.REDIRECT_URI,
        scope: process.env.APP_SCOPES
    });

    const token = oauth2.accessToken.create(result);
    const tokens = token.token;

    const user = jwt.decode(tokens.id_token);
    //ref = firebaseDb.ref("outlookBookingsApp/" + user.oid);
    ref = firebaseDb.ref("outlookBookingsApp");
    const eTime = tokens.expires_at.getTime();
    ref.push({
        accessToken: tokens.access_token,
        expiredTime: tokens.expires_at.getTime(),
        idToken: tokens.id_token,
        refreshToken: tokens.refresh_token,
    });
}

/* Get tokens from firebase (Google Database) */
async function getTokenFromDatabase(path) {
    let tokensFromFirebase = {};
    ref = firebaseDb.ref(path);
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

/* Check if access token is expired or not */
/* If it is, get a new access token with refresh token */
async function getNewAccessTokenDB(data) {
    let access_token = data.aT;

    if (access_token) {
        // We have a token, but is it expired?
        // Expire 5 minutes early to account for clock differences
        const FIVE_MINUTES = 300000;
        const expiration = new Date(parseFloat(data.eT - FIVE_MINUTES));
        if (expiration > new Date()) {
            // Token is still good, just return it
            return access_token;
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

    // Data is null, return empty
    return null;
}


exports.getAuthUrl = getAuthUrl;
exports.getTokenFromMS = getTokenFromMS;
exports.getTokenFromDB = getTokenFromDatabase;
exports.getNewAccessTokenDB = getNewAccessTokenDB;
