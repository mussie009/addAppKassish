const passport = require('passport');
const AzureAdStrategy = require('passport-azure-ad').OIDCStrategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

const myfun = () => {
   new User({openid: 'psoten dfaksdjfla'}).save()
   .then(() => console.log('new user in the db'));
 }
 myfun()

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
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
    validateIssuer: keys.validateIssuer,
    //isB2C: keys.isB2C,
    //issuer: keys.issuer,
    passReqToCallback: keys.passReqToCallback,
    scope: keys.scope,
    loggingLevel: keys.loggingLevel,
    //loggingNoPII: keys.loggingNoPII,
    nonceLifetime: keys.nonceLifetime,
    nonceMaxAmount: keys.nonceMaxAmount,
    useCookieInsteadOfSession: keys.useCookieInsteadOfSession,
    //cookieSameSite: keys.cookieSameSite, // boolean
    cookieEncryptionKeys: keys.cookieEncryptionKeys,
    //clockSkew: keys.clockSkew,
    //proxy: { port: 'proxyport', host: 'proxyhost', protocol: 'http' },

}, async (iss, sub, profile, accessToken, refreshToken, done) => {
   // console.log(iss, sub, profile, accessToken, refreshToken);
    const existingUser = await User.findOne({openid: profile.id});

    if(existingUser){
      done(null, existingUser);
    } else {
      const user = await new User({openid: profile.id}).save()
      done(null, user);
    }
}));

