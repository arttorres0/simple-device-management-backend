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
