const passport = require('passport');
const AzureAdStrategy = require('passport-azure-ad').OIDCStrategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log("from serialize, user: ", user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("from deserialize, id: ", id);
  User.findById(id).then((user) => {done(null, user)})
});


passport.use(new AzureAdStrategy({
    identityMetadata: keys.identityMetadata,
    clientID: keys.clientID,
    responseType: keys.responseType,
    responseMode: keys.responseMode,
    redirectUrl: keys.redirectUrl,
    allowHttpForRedirectUrl: keys.allowHttpForRedirectUrl,
    clientSecret: keys.clientSecret,
    //validateIssuer: keys.validateIssuer,
    //isB2C: keys.isB2C,
    //issuer: keys.issuer,
    //passReqToCallback: keys.passReqToCallback,
    scope: keys.scope,
    //loggingLevel: keys.loggingLevel,
    //loggingNoPII: keys.loggingNoPII,
    //nonceLifetime: keys.nonceLifetime,
    //nonceMaxAmount: keys.nonceMaxAmount,
    //useCookieInsteadOfSession: keys.useCookieInsteadOfSession,
    //cookieSameSite: keys.cookieSameSite, // boolean
    //cookieEncryptionKeys: keys.cookieEncryptionKeys,
    //clockSkew: keys.clockSkew,
    //proxy: keys.proxy,

}, async (iss, sub, profile, accessToken, refreshToken, done) => {
  
    const existingUser = await User.findOne({openid: profile.oid});

    if(existingUser){
      done(null, existingUser);
    } else {
      const user = await new User({openid: profile.oid}).save();
      done(null, user);
    }
}));

