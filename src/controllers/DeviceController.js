const Device = require("../models/Device");
const Sequelize = require("sequelize");

exports.create = async (req, res) => {
  const deviceReqInfo = {
    color: req.body.color,
    partNumber: req.body.partNumber,
    categoryId: req.body.categoryId,
  };

  try {
    const device = await Device.create(deviceReqInfo);
    return res.send({ device, message: "Device saved successfully." });
  } catch (err) {
    if (err instanceof Sequelize.DatabaseError) {
      return res.status(400).send({
        message: err.message,
      });
    }
    return res.status(500).send({
      message: err.message || "Error saving device.",
    });
  }
};

exports.findAll = async (req, res) => {
  var filterColor = req.query.color || "";
  var filterCategoryId = req.query.categoryId || "";
  var filterPartNumber = req.query.partNumber || "";
  var page = req.query.page || 1;
  var pageSize = 10;

  try {
    const devices = await Device.findAndCountAll({
      include: ["category"],
      limit: pageSize,
      offset: pageSize * page - pageSize,
      where: {
        [Sequelize.Op.and]: [
          Sequelize.where(Sequelize.fn("lower", Sequelize.col("color")), {
            [Sequelize.Op.like]: "%" + filterColor.toLowerCase() + "%",
          }),
          {
            categoryId: {
              [Sequelize.Op.like]: "%" + filterCategoryId + "%",
            },
          },
          {
            partNumber: {
              [Sequelize.Op.like]: "%" + filterPartNumber + "%",
            },
          },
        ],
      },
    });

    return res.send({
      devices: devices.rows,
      page,
      pageSize: pageSize,
      numberOfResults: devices.count,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error getting list of devices.",
    });
  }
};
