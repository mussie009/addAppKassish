const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/auth/openid", "/api/*"],
    createProxyMiddleware({
      target: "http://localhost:5000"
    })
  );
};