//prod.js - production keys

module.exports = {
    // Required
    identityMetadata: process.env.IDENTITY_META_DATA,

    // Required, the client ID of your app in AAD.
    clientID: process.env.CLIENT_ID,
  
    // Required, must be 'code', 'code id_token', 'id_token code' or 'id_token'
    responseType: process.env.RESPONSE_TYPE,
  
    // Required
    responseMode: process.env.RESPONSE_MODE,
  
    // Required, the reply URL registered in AAD for your app
    redirectUrl: process.env.REDIRECT_URL,

    // Required if `responseType` is 'code', 'id_token code' or 'code id_token'.
    // If app key contains '\', replace it with '\\'.
    clientSecret: process.evn.CLIENT_SECRET, 

    //this key is associated with the cookie-session package and not Azure
    cookieKey: process.env.COOKIE_KEY,

    // mongobd connection string
    MONGODB: process.env.MONGODB,

    // port: 3000,

    // domain: 'localhost',

    // protocol: 'http',
  };
  


