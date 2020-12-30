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

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next();
  else
  res.redirect('/')
};

module.exports = (app) => {
  app.post("/api/estimer", ensureAuthenticated, controller.estimate);
};

