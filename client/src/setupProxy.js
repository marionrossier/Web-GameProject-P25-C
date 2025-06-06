const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        "/wp-json",
        createProxyMiddleware({
            target: "https://dev-webgame-p25.pantheonsite.io",
            changeOrigin: true,
            secure: false,
        })
    );
};
