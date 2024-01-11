// noinspection HttpUrlsUsage
const {createProxyMiddleware} = require('http-proxy-middleware');

const options = {
    target: 'http://127.0.0.1',
    router: () => {
        return 'http://127.0.0.1:8080/';
    },
    changeOrigin: true,
    secure: false,
    ws: true,
    proxyTimeout: 60000,
    logLevel: "debug"
};

/**
 * This file may seem broken but its more likely your computers internal resolve to the hosts file
 * Note in this situation apache may present error
 *      AH01114: HTTP: failed to make connection to backend: 127.0.0.1
 * Node would display error
 *      [HPM] Error occurred while proxying request localhost:3000/... to undefined [ECONNREFUSED]
 *
 * restart apache, restart node, restart your computer, pray to the computer gods  :/
 */
module.exports = function (app) {

    const onProxyRes = (proxyResponse, request, response) => {
        console.log('proxyResponse', proxyResponse.headers);
        console.log('response', response.headers);
    };


    app.use(createProxyMiddleware({
        ...options,
        pathFilter: '/rest/**',
        pathRewrite(path, req) {
            //log.info(path, 3);
            path = path.replace(/^\/rest/, '/rest');
            return path;
        },
        onProxyRes
    }));

    app.use(createProxyMiddleware({
        ...options,
        pathFilter: '/carbon/**',
        pathRewrite(path, req) {
            //log.info(path, 5);
            path = path.replace(/^\/carbon/, '/carbon');
            return path;
        },
        onProxyRes
    }));

    app.use(createProxyMiddleware({
        ...options,
        pathFilter: '/logout/**',
        pathRewrite(path, req) {
            //log.info(path, 6);
            path = path.replace(/^\/logout/, '/logout');
            return path;
        },
        onProxyRes
    }));

};
