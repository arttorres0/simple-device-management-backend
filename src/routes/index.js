const express = require("express");
const routes = express.Router();

require("./categories")(routes);

module.exports = routes;
