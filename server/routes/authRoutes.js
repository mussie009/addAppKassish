const passport = require('passport');
const keys = require('../config/keys');


module.exports = (app) => {
  
function getAppHomeURL() {
    if (keys.port) {
    return keys.protocol + "://" + keys.domain + ":" + keys.port
    }

    return keys.protocol + "://" + keys.domain
}

app.get('/auth/openid', passport.authenticate('azuread-openidconnect', { session: false }));

app.get('/auth/openid/return',
  (req, res, next) => {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                     
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  (req, res) =>  {
    console.log('We received a return from AzureAD.');
    res.redirect(getAppHomeURL() + "/estimer")

});

app.post('/auth/openid/return',
  (req, res, next) => {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  (req, res) => {
    console.log('We received a return from AzureAD.');
    res.redirect(getAppHomeURL() + "/estimer")
});

  
app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

}