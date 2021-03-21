module.exports = (routes) => {
  const devices = require("../controllers/DeviceController");

  routes.post("/devices", devices.create);
};
