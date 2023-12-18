// noinspection HttpUrlsUsage
const {createProxyMiddleware} = require('http-proxy-middleware');

const getLogger = require("webpack-log");

const log = getLogger({name: 'setupProxy.js'});

const isGitHubActions = process.env.REACT_APP_TEST_REMOTE === 'true'

// shit broken? have you tried restarting your computer?
// @link https://github.com/netlify/create-react-app-lambda/issues/19
const subdomain = isGitHubActions ? 'www': 'local'; // don't change this to the remote as it will not work, this is currently experimental.

const port = isGitHubActions ? '' : ':8080';

const proxyProtocol = 'http' + (isGitHubActions ? 's' : '');

const proxyDestination = (tld) => {
    const dest = proxyProtocol + '://' + subdomain + '.carbonorm.' + tld + port + '/'
    log.info(dest)
    return dest
}

const options = {
    target: 'http://127.0.0.1',
    router: (req) => {

        let host = ''

        req.rawHeaders.find((value, index) => {
            if (value === 'Referer') {
                return host = req.rawHeaders[index + 1];
            }
        });

        if ('string' !== typeof host) {

            log.info(req.rawHeaders);

            throw new Error('host not found');

        }

        if ('http://127.0.0.1:3000/' === host || '' === host) {

            return proxyDestination('dev')

        }

        const tld = new URL(host).hostname.split('.').pop();

        return proxyDestination(tld);

    },
    changeOrigin: true,
    secure: false,
    ws: true,
    proxyTimeout: 60000,
    logLevel: "debug"
};

// I see this change between starts for no apparent reason.
const explicitDS = true;

const optionallyExplicitDS = explicitDS ? '/' : '';

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
            path = path.replace(/^\/rest/, optionallyExplicitDS + 'rest');
            return path;
        },
        onProxyRes
    }));

    app.use(createProxyMiddleware({
        ...options,
        pathFilter: '/carbon/**',
        pathRewrite(path, req) {
            //log.info(path, 5);
            path = path.replace(/^\/carbon/, optionallyExplicitDS + 'carbon');
            return path;
        },
        onProxyRes
    }));

    app.use(createProxyMiddleware({
        ...options,
        pathFilter: '/logout/**',
        pathRewrite(path, req) {
            //log.info(path, 6);
            path = path.replace(/^\/logout/, optionallyExplicitDS + 'logout');
            return path;
        },
        onProxyRes
    }));

};
