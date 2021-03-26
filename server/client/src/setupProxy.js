const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api/openid", "/api/add"],
    createProxyMiddleware({
      target: "http://localhost:5000"
    })
  );
};