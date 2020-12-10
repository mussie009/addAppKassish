const passport = require('passport');

module.exports = (app) => {

app.get('/login', passport.authenticate('azuread-openidconnect', { session: false }));
app.get('/auth/openid', passport.authenticate('azuread-openidconnect'));
app.get('/auth/openid/return', passport.authenticate('azuread-openidconnect'));

app.get('/api/current_user', (req, res) => {
    res.send(req.user)
});

}