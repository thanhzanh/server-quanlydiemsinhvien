const express = require('express');
require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routeApi = require('./routes/index.route');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

routeApi(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});