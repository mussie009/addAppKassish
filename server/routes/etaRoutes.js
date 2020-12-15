const controller = require("../controllers/eta.controller");

module.exports = (app) => {
  app.post("/estimate", controller.estimate);
};
