const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/", "/api/current_user", "/api/logout"],
    createProxyMiddleware({
      target: "http://localhost:3000",
    })
  );
};