/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-var-requires */
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    ui: './src/app/index.tsx',
    code: './src/plugin/controller.ts',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss')('./tailwind.config.js'),
                  require('autoprefixer'),
                  require('cssnano'),
                ],
              },
            },
          },
        ],
      },
      { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  plugins: [
    new webpack.DefinePlugin({
      global: {},
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/app/index.html',
      filename: 'ui.html',
      chunks: ['ui'],
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ].filter(Boolean),

  devServer: {
    liveReload: false,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8000,
    allowedHosts: ['*'],
    hot: 'only',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    },
  },
})
