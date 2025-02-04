(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {accToken, isSignedIn} = require('./graph');

async function searchFiles(query) {
  try {
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root/search(q='${query}')`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accToken}`
      }
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

function getSubstr(str) {
  const lastSlashIndex = str.lastIndexOf('/');
  return str.substring(lastSlashIndex + 1);
}

document.getElementById("user-input").addEventListener('input', function() {
    console.log("Trying to search. " + isSignedIn);

    if (this.value.lastIndexOf('/') !== -1 && isSignedIn) {
        console.log("Searching for files...");
        let query = getSubstr(this.value);
        console.log("Access token is " + accToken);
        console.log("Search query is " + query);
        searchFiles(query);
    }
})
},{"./graph":2}],2:[function(require,module,exports){
const msalInstance = new msal.PublicClientApplication(msalConfig);

let accToken;
let isSignedIn = false;

function signIn() {
  const loginRequest = {
    scopes: graphRequest.scopes,
  };

  msalInstance.loginPopup(loginRequest)
    .then(loginResponse => {
      console.log("Login successful:", loginResponse);
      accToken = loginResponse.accessToken;
      isSignedIn = true;
      // Additional logic after sign-in can be added here.
    })
    .catch(error => {
      console.error("Login failed:", error);
    });
}

document.getElementById("signIn").addEventListener("click", signIn);

module.exports = {accToken, isSignedIn};
},{}]},{},[1]);
