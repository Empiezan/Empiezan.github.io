var dict = new Object();
function populateDict() {
    dict = {
        "Individual Exam": '1R0eKhhC3YMptbfDYWKf_Gv9FzlJC-ms8c_k1telL4Zc',
        "Topics Exam": '12A5emA5i8z3rcDXPjbXa8LTJ3fYge3yCgSEBb0VkYoM'
    };
}

var CLIENT_ID = '88164074114-62uqovcn20dug205olv6e44vbt7e4mi1.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD9hb2yjF37X2pdzd41A_mvVStoblrrn1c';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        document.getElementById('authorize-button').style.display = 'none';
        document.getElementById('signout-button').style.display = 'block';
    } else {
        document.getElementById('authorize-button').style.display = 'block';
        document.getElementById('signout-button').style.display = 'none';
    }
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
// Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

// Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        document.getElementById('authorize-button').onclick = handleAuthClick;
        document.getElementById('signout-button').onclick = handleSignoutClick;
    });
}



/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function makeApiCall() {
    var e = document.getElementById("test");
    var t = e.options[e.selectedIndex].text;
    findStudent(t);
}

function findStudent (t) {
    var studentIndex;
    var sID = document.getElementById("sID").value;
// console.log(t);
    var sheetId = dict[t];
// console.log(sheetId);
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Sheet1!B:B'
    }).then((response) => {
        var result = response.result;
    for (var i = 0; i < result.values.length; ++i) {
        if (result.values[i] == sID) {
            studentIndex = i + 1;
            break;
        }
    }
    console.log(studentIndex);
    updateCell(sheetId, studentIndex);
});
}

function updateCell(sheetId, studentIndex) {
    var score = document.getElementById("q1").value;
    var params = {
// The ID of the spreadsheet to update.
        spreadsheetId: sheetId,  // TODO: Update placeholder value.

// The A1 notation of the values to update.
        range: 'Sheet1!C' + studentIndex + ':C' + studentIndex,  // TODO: Update placeholder value.

// How the input data should be interpreted.
        valueInputOption: 'RAW',  // TODO: Update placeholder value.
    };

    var valueRangeBody = {
        "values": [
            [
                score
            ],
        ]
// TODO: Add desired properties to the request body. All existing properties
// will be replaced.
    };

    var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    request.then(function(response) {
// TODO: Change code below to process the `response` object:
        console.log(response.result);
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

function initClient() {
    populateDict();
    var API_KEY = 'AIzaSyD9hb2yjF37X2pdzd41A_mvVStoblrrn1c';  // TODO: Update placeholder with desired API key.

    var CLIENT_ID = '88164074114-62uqovcn20dug205olv6e44vbt7e4mi1.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.

    // TODO: Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}