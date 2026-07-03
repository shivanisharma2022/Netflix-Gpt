const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/3",
    createProxyMiddleware({
      target: "https://api.themoviedb.org",
      changeOrigin: true,
    }),
  );
};
