let code = document.getElementById("myCookie");

if (document.cookie) {
    code.innerHTML = document.cookie;
} else {
    code.innerHTML = "沒有東西";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        console.log(c);
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
            console.log("after substring: " + c);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function getData() {
    let accessToken = await getCookie("graph_access_token");

    const client = graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
    try {
        const result = await client
            .api('/me/mailfolders/inbox/messages')
            .top(10)
            .select('subject,from,receivedDateTime,isRead')
            .orderby('receivedDateTime DESC')
            .get();
        console.log(JSON.stringify(result, null, 2));
    } catch (err) {
        console.log(err);
    }

}
