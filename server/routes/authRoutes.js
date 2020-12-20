const passport = require('passport');

module.exports = (app) => {

app.get('/auth/openid', passport.authenticate('azuread-openidconnect', { session: false }));

app.get('/auth/openid/return', passport.authenticate('azuread-openidconnect'));

app.get('/api/logout', (res, req) => {
    req.logout();
    res.send(req.user);
   // res.redirect("/");
});

app.get('/api/current_user', (req, res) => {
    const myUser = {name: "Mussie"};
    res.send(req.user);
    //res.send(myUser);
});

}