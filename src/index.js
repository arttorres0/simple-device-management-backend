const express = require("express");
const app = express();

const { port } = require("./config");

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

module.exports = app;
