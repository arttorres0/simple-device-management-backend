module.exports = (routes) => {
  const categories = require("../controllers/CategoryController");

  routes.post("/categories", categories.create);
  routes.get("/categories", categories.findAll);
};
