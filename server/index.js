
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('dotenv').config(); // Enables environment variables
require('./services/passport');

mongoose.connect(keys.MONGODB, {useNewUrlParser: true}).then(() => {console.log("Mongodb connection successfull")});

const app = express();


app.use(bodyParser.urlencoded({ extended : true }));

const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
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
