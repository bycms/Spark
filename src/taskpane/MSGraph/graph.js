const msalInstance = new msal.PublicClientApplication(msalConfig);

window.accToken;
window.isSignedIn = false;

function signIn() {
  const loginRequest = {
    scopes: graphRequest.scopes,
  };

  msalInstance.loginPopup(loginRequest)
    .then(loginResponse => {
      console.log("Login successful:", loginResponse);
      window.accToken = loginResponse.accessToken;
      window.isSignedIn = true;
      // Additional logic after sign-in can be added here.
    })
    .catch(error => {
      console.error("Login failed:", error);
    });
}

document.getElementById("signIn").addEventListener("click", signIn);