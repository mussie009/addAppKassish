const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/login", "/auth/openid"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};