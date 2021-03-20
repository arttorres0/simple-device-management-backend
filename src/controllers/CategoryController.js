const Category = require("../models/Category");
const Sequelize = require("sequelize");

exports.create = async (req, res) => {
  const categoryReqInfo = {
    name: req.body.name,
  };

  try {
    const category = await Category.create(categoryReqInfo);
    return res.send({ category, message: "Category saved successfully." });
  } catch (err) {
    console.log(err);
    if (err instanceof Sequelize.UniqueConstraintError) {
      return res.status(409).send({ message: "Duplicated category name." });
    } else if (err instanceof Sequelize.DatabaseError) {
      return res.status(400).send({
        message: err.message,
      });
    }
    return res.status(500).send({
      message: err.message || "Error saving category.",
    });
  }
};
