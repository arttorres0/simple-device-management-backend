const express = require("express");
const app = express();
const db = require("./database/db");
const { port } = require("./config");

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

(async () => {
  try {
    await db.authenticate();
    console.log("Connected to database successfully.");
  } catch (error) {
    console.log(error);
  }
})();

module.exports = app;
