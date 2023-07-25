const {createProxyMiddleware} = require('http-proxy-middleware');

const target = 'http://local.carbonphp.com:8080/';

module.exports = function (app) {
    app.use('/rest/**', createProxyMiddleware({
        target: target,
        changeOrigin: true,
        secure: false,
        proxyTimeout: 4000,
        pathRewrite(path, req) {
            return path.replace(/^\/rest/, 'rest')
        },
        logLevel: "debug"
    }));
    app.use('/carbon/**', createProxyMiddleware({
        target: target,
        changeOrigin: true,
        secure: false,
        proxyTimeout: 4000,
        pathRewrite(path, req) {
            return path.replace(/^\/carbons/, 'carbons')
        },
        logLevel: "debug"
    }));
    app.use('/view/**', createProxyMiddleware({
        target: target,
        changeOrigin: true,
        secure: false,
        proxyTimeout: 4000,
        pathRewrite(path, req) {
            return path.replace(/^\/view/, 'view')
        },
        logLevel: "debug"
    }));
};
