const express = require("express");
const app = express();
const db = require("./database/db");
const routes = require("./routes/index");
const { port } = require("./config");
const bodyParser = require("body-parser");

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

(async () => {
  try {
    await db.sync();
    console.log("Connected to database successfully.");
  } catch (error) {
    console.log(error);
  }
})();

app.use(bodyParser.json());
app.use(routes);

module.exports = app;
