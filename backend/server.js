const express = require('express');
const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser')
const routes = require('./routes');
const app = express();
require('./database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(config.port, () => {
	console.log("Server Started!", config.port);
});