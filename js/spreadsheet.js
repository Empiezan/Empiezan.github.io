var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': 'AIzaSyD9hb2yjF37X2pdzd41A_mvVStoblrrn1c',
        'discoveryDocs': [discoveryUrl],
        'clientId': '88164074114-62uqovcn20dug205olv6e44vbt7e4mi1.apps.googleusercontent.com',
        'scope': SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        var user = GoogleAuth.currentUser.get();
        setSigninStatus();

        // Call handleAuthClick function when user clicks on
        //      "Sign In/Authorize" button.
        $('#sign-in-or-out-button').click(function() {
            handleAuthClick();
        });
        $('#revoke-access-button').click(function() {
            revokeAccess();
        });
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked 'Sign out' button.
        GoogleAuth.signOut();
    } else {
        // User is not signed in. Start Google auth flow.
        GoogleAuth.signIn();
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

function makeApiCall() {
    var dict = {
        "IND": '1R0eKhhC3YMptbfDYWKf_Gv9FzlJC-ms8c_k1telL4Zc',
        "ENV": '12A5emA5i8z3rcDXPjbXa8LTJ3fYge3yCgSEBb0VkYoM',
        "HUM": '12A5emA5i8z3rcDXPjbXa8LTJ3fYge3yCgSEBb0VkYoM',
        "COO": '12A5emA5i8z3rcDXPjbXa8LTJ3fYge3yCgSEBb0VkYoM',
        "TEA": '12A5emA5i8z3rcDXPjbXa8LTJ3fYge3yCgSEBb0VkYoM'
    };
    var testID = document.getElementById("testID").value;
    var testType = testID.substring(0, 3);
    var sheetId = dict[testType];

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:A'
    }).then((response) => {
        var result = response.result;
    for (var i = 0; i < result.values.length; ++i) {
        if (result.values[i] == sID) {
            studentIndex = i + 1;
            break;
        }
    }
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
});
}

function setSigninStatus(isSignedIn) {
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        $('#sign-in-or-out-button').html('Sign out');
        $('#revoke-access-button').css('display', 'inline-block');
        $('#auth-status').html('You are currently signed in and have granted ' +
            'access to this app.');
    } else {
        $('#sign-in-or-out-button').html('Sign In/Authorize');
        $('#revoke-access-button').css('display', 'none');
        $('#auth-status').html('You have not authorized this app or you are ' +
            'signed out.');
    }
}
$(document).ready(function() {
    $("#submit").click(function() {
        console.log("hello");
        makeApiCall();
    });
});

function updateSigninStatus(isSignedIn) {
    setSigninStatus();
}


$(document).ready(function() {
    $("#next").click(function() {
        scanner.stop();
        document.getElementById("selfie").style.display = 'none';
        document.getElementById("qID");

        var testID = document.getElementById("testID").value;
        var testType = testID.substring(0, 3);
        document.getElementById("testID").style.display = 'none';

        if (testType === "IND") {
            document.getElementById("student1").style.display = 'block';
        } else if (testType === "ENV" || testType === "HUM" || testType === "COO") {
            document.getElementById("student1").style.display = 'block';
            document.getElementById("student2").style.display = 'block';
        } else if (testType === "Team Round") {
            document.getElementById("schoolID").style.display = 'block';
        } else {
            console.log("Unhandled Exception!");
        }
        document.getElementById("schoolID").style.display = 'block';
        document.getElementById("q").style.display = 'block';
        document.getElementById("next").style.display = 'none';
        document.getElementById("back").style.display = 'inline-block';
        document.getElementById("submit").style.display = 'inline-block';
    });
});