const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.SERVER_PORT || 3000,
  dbUri: process.env.DB_URI,
};
