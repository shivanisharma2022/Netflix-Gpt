const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/3",
    createProxyMiddleware({
      target: "https://api.themoviedb.org",
      changeOrigin: true,
      proxyTimeout: 60000,
      timeout: 60000,
    }),
  );

  // Proxy poster images through localhost to avoid ad-blocker blocking image.tmdb.org
  app.use(
    "/tmdb-images",
    createProxyMiddleware({
      target: "https://image.tmdb.org",
      changeOrigin: true,
      pathRewrite: { "^/tmdb-images": "" },
    }),
  );
};
