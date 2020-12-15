const cors = require('cors');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('dotenv').config(); // Enables environment variables
require('./services/passport');

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({limit: '1mb'})); // Upgrade limit due to Too Large Payload error

require('./routes/authRoutes')(app);
require('./routes/etaRoutes')(app);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Running at localhost:${PORT}...`);
});
