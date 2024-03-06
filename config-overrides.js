/* config-overrides.js */
// @link https://github.com/timarney/react-app-rewired/
const getLogger = require('webpack-log');
const rewireTypingsForCssModule = require("react-app-rewire-typings-for-css-module");
const {
    override,
    addWebpackPlugin, removeWebpackPlugin, getBabelLoader, addBundleVisualizer,
} = require('customize-cra')
const log = getLogger({name: 'config-overrides.js'});
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');

// I have seen issues when you take the relative path from the package.json file, please do not remove the ./
const pkg = require('./package.json');

const {
    defaultGetLocalIdent
} = require("css-loader/dist/utils")
const {WebpackManifestPlugin} = require("webpack-manifest-plugin");


// https://github.com/osdevisnot/react-app-rewire-create-react-library/blob/master/index.js
module.exports = override(
    ((config) => {
        addBundleVisualizer({
            "analyzerMode": "static",
            "reportFilename": "report.html",
        }, true);
        return config;
    })
        //addWebpackPlugin(new MiniCssExtractPlugin()),
        ((config) => {

            const updatedAssetManifest = new WebpackManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: process.env.PUBLIC_URL,
                generate: (seed, files, entrypoints) => {
                    const manifestFiles = files.reduce((manifest, file) => {
                        manifest[file.name] = file.path;
                        return manifest;
                    }, seed);

                    const entrypointFiles = entrypoints.main.filter(
                        fileName => !fileName.endsWith('.map')
                    );

                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles,
                    };
                },
            });

            config.plugins.forEach((p, i) => {
                if (p instanceof WebpackManifestPlugin
                    || (undefined !== p?.options?.fileName && p?.options?.fileName === 'asset-manifest.json')) {
                    log.info('WebpackManifestPlugin found, replacing it');
                    // node_modules/react-scripts/config/webpack.config.js
                    config.plugins.splice(i, 1, updatedAssetManifest);
                }
            });

            return config;

        }),
    function (config, _env) {

        log.info('webpack env', process.env.NODE_ENV)

        // what's going on here? @link https://stackoverflow.com/questions/73551420/removing-hash-from-react-css-modules
        // noinspection JSUnusedGlobalSymbols
        config = rewireTypingsForCssModule.factory({
            modules: {
                exportLocalsConvention: 'camelCase',
                mode: 'local',
                localIdentName: 'production' === process.env.NODE_ENV ? '[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]',
                exportGlobals: true,
                getLocalIdent: (context, localIdentName, localName, options) => {

                    // noinspection JSUnresolvedReference
                    if (false === context.resourcePath.includes('index.module.')
                        && false === context.resourcePath.includes('bootstrap.module.')
                        && false === context.resourcePath.includes('node_modules')) {

                        localName = defaultGetLocalIdent(context, localIdentName, localName, options)
                            .replace("[local]", localName)

                    }

                    return localName;

                }

            }
        })(config); // do not pass env as it will cause the production build will not be modified

        // log.info('webpack configuration post config-overrides.js', JSON.stringify(config))

        return config;

    },
    (config) => {

        const options = getBabelLoader(config).options;

        const originalPreset = options.presets.find((preset) => preset[0].includes('babel-preset-react-app'));
        if (originalPreset) {
            Object.assign(originalPreset[1], {
                development: true,
                importSource: '@welldone-software/why-did-you-render',
            });
        }

        return config;

    },
);