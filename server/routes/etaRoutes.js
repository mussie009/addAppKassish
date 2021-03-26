const controller = require("../controllers/calculate.controller");
/**
 * API endpoint for retrieving data from the Posten API
 */

module.exports = (app) => {
  app.post("/api/add", controller.calculate)
};

