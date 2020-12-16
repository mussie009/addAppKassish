const controller = require("../controllers/eta.controller");

/**
 * API endpoint for retrieving data from the Posten API
 */
module.exports = (app) => {
  app.post("/estimate", controller.estimate);
};
