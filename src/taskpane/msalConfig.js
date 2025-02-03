const msalConfig = {
    auth: {
      clientId: "968f6a33-df27-4499-b2c8-186db65fec06", // e.g., "12345678-abcd-efgh-ijkl-1234567890ab"
      authority: "https://login.microsoftonline.com/common", // Change if using a tenant-specific authority
      redirectUri: "http://localhost" // e.g., "http://localhost:3000"
    },
    cache: {
      cacheLocation: "localStorage", // "sessionStorage" is also available
      storeAuthStateInCookie: true,   // Set to true if issues on IE11 or Edge
    }
  };
  
  // Define the scopes for accessing the Graph API.
  const graphRequest = {
    // Include Files.Read for OneDrive file access.
    scopes: ["User.Read", "Files.Read"]
  };
  