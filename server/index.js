
const cors = require('cors');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


require('./routes/etaRoutes')(app);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Running at localhost:${PORT}...`);
});
