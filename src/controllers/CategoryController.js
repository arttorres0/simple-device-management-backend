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

exports.findAll = async (req, res) => {
  var filterName = req.query.name || "";
  var page = req.query.page || 1;
  var pageSize = 10;

  try {
    const categories = await Category.findAndCountAll({
      limit: pageSize,
      offset: pageSize * page - pageSize,
      where: Sequelize.where(Sequelize.fn("lower", Sequelize.col("name")), {
        [Sequelize.Op.like]: "%" + filterName.toLowerCase() + "%",
      }),
    });

    return res.send({
      categories: categories.rows,
      page,
      pageSize: pageSize,
      numberOfResults: categories.count,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error getting list of categories.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.categoryId);
    if (category) {
      category.destroy();
      // TODO: delete all devices with the deleted category (?)
      return res.send({
        message: "Category deleted successfully.",
      });
    } else {
      return res.status(404).send({
        message: "Category not found.",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Error deleting category.",
    });
  }
};
