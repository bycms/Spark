// Initialize the PublicClientApplication instance with msalConfig.
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Function to handle sign-in using a popup.
function signIn() {
  const loginRequest = {
    scopes: graphRequest.scopes,
  };

  msalInstance.loginPopup(loginRequest)
    .then(loginResponse => {
      console.log("Login successful:", loginResponse);
      // Additional logic after sign-in can be added here.
    })
    .catch(error => {
      console.error("Login failed:", error);
    });
}

document.getElementById("signIn").addEventListener("click", signIn);