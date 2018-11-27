const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Webpack = require('webpack');
const Autoprefixer = require('autoprefixer');
const PreCSS = require('precss');
const Process = require('process');
const FS = require('fs');
const Path = require('path');

const appDirectory = FS.realpathSync(Process.cwd());
const resolveAppPath = relativePath => Path.resolve(appDirectory, relativePath);

const paths = {
  dist: resolveAppPath('dist'),
  indexJs: resolveAppPath('src/index.js'),
};

module.exports = (_, argv) => {
  const { mode } = argv;
  const isProd = mode === 'production';

  const htmlMinifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  };

  const config = {
    context: appDirectory,
    entry: paths.indexJs,
    output: {
      path: paths.dist,
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-react',
                  [
                    '@babel/preset-env',
                    {
                      forceAllTransforms: true,
                      targets: '> .25%, not dead',
                      useBuiltIns: 'entry',
                    },
                  ],
                ],
                plugins: [
                  [
                    '@babel/plugin-transform-react-jsx',
                  ],
                ],
              },
            },
            {
              loader: 'eslint-loader',
            },
          ],
          resolve: {
            extensions: ['.js', '.jsx'],
          },
        },
        {
          test: /\.jpg|png|svg|woff|woff2$/,
          use: 'file-loader',
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  PreCSS,
                  Autoprefixer,
                ],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: HtmlWebpackTemplate,
        inject: false,
        minify: isProd ? htmlMinifyOptions : false,
        headHtmlSnippet: '<script src="https://connectors.tableau.com/libs/tableauwdc-2.1.latest.js" type="text/javascript"></script>',
        devServer: !isProd,
        appMountId: 'app',
        title: 'AWX Web Data Connector for Tableau',
        links: [
          'https://fonts.googleapis.com/icon?family=Material+Icons',
        ],
        meta: [
          {
            'http-equiv': 'Cache-Control',
            content: 'no-cache',
          },
          {
            'http-equiv': 'Cache-Control',
            content: 'no-store',
          },
        ],
      }),
      new MiniCssExtractPlugin(),
      new Webpack.DefinePlugin({
        LOG_LEVEL: JSON.stringify(isProd ? 'warn' : 'debug'),
      }),
      new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
  };

  if (isProd) {
    config.plugins.push(new OptimizeCssAssetsPlugin());
  }

  return config;
};
