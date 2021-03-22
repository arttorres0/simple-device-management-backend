const Sequelize = require("sequelize");
const db = require("../database/db");

const Category = db.define("category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    unique: true,
  },
});

module.exports = Category;
