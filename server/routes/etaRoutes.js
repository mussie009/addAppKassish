const controller = require("../controllers/eta.controller");

/**
 * API endpoint for retrieving data from the Posten API
 */

const checkAuthentication = (req, res, next) => {
  if(!req.user){
      res.redirect('/')
  }else {
      next();
  }
}

module.exports = (app) => {
  app.post("/estimate", checkAuthentication, controller.estimate);
};

