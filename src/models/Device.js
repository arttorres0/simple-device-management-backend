const Sequelize = require("sequelize");
const db = require("../database/db");
const Category = require("./Category");

const Device = db.define("device", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  color: {
    type: Sequelize.STRING(16),
    allowNull: false,
    validate: {
      isAlpha: true,
    },
  },
  partNumber: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      min: 1,
    },
  },
});

Category.hasMany(Device, {
  as: "devices",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Device.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    field: "category",
    constraints: true,
    foreignKeyConstraint: true,
  },
});

module.exports = Device;
