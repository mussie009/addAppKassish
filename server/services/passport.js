const passport = require('passport');
const AzureAdStrategy = require('passport-azure-ad').OIDCStrategy;
const keys = require('../config/keys');


passport.serializeUser((user, done) => {
    done(null, user.oid);
});
  
passport.deserializeUser((oid, done) => {
    findByOid(oid, (err, user) => {
      done(err, user);
    });
});

// array to hold logged in users
const users = [];

const findByOid = (oid, fn) => {
  for (let i = 0, len = users.length; i < len; i++) {
    let user = users[i];
   log.info('we are using user: ', user);
    if (user.oid === oid) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};


passport.use(new AzureAdStrategy({
    identityMetadata: keys.identityMetadata,
    clientID: keys.clientID,
    responseType: keys.responseType,
    responseMode: keys.responseMode,
    redirectUrl: keys.redirectUrl,
    allowHttpForRedirectUrl: keys.allowHttpForRedirectUrl,
    clientSecret: keys.clientSecret,
    validateIssuer: keys.validateIssuer,
    isB2C: keys.isB2C,
    //issuer: keys.issuer,
    passReqToCallback: keys.passReqToCallback,
    //scope: keys.scope,
    //loggingLevel: keys.loggingLevel,
    //loggingNoPII: keys.loggingNoPII,
    nonceLifetime: keys.nonceLifetime,
    nonceMaxAmount: keys.nonceMaxAmount,
    useCookieInsteadOfSession: keys.useCookieInsteadOfSession,
    //cookieSameSite: keys.cookieSameSite, // boolean
    cookieEncryptionKeys: keys.cookieEncryptionKeys,
    //clockSkew: keys.clockSkew,
    //proxy: { port: 'proxyport', host: 'proxyhost', protocol: 'http' },

}, (iss, sub, profile, accessToken, refreshToken, done) => {
   // console.log(iss, sub, profile, accessToken, refreshToken);
    if (!profile.oid) {
        return done(new Error("No oid found"), null);
      }
      process.nextTick(() => {
        findByOid(profile.oid, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            // "Auto-registration"
            users.push(profile);
            return done(null, profile);
          }
          return done(null, user);
        });
      });
}));

