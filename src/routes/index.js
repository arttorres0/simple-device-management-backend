const express = require("express");
const routes = express.Router();

require("./categories")(routes);
require("./devices")(routes);

module.exports = routes;
