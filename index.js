const express = require('express');
require("dotenv").config();
const cors = require('cors');
const routeApi = require('./routes/index.route');

const app = express();
const port = process.env.PORT;

app.use(cors());

routeApi(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});