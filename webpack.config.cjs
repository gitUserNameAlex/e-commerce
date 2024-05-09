const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');
const entryPath = path.resolve(srcPath, 'main.tsx');
const htmlPath = path.resolve(publicPath, 'index.html');
const buildPath = path.resolve(__dirname, 'dist');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  // Заменяем в нашей функции style-loader на mini-css-extract-plugin
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  entry: entryPath,
  target: !isProd ? 'web' : 'browserslist',
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      app: path.join(srcPath, 'app'),
      components: path.join(srcPath, 'components'),
      store: path.join(srcPath, 'store'),
      config: path.join(srcPath, 'config'),
      types: path.join(srcPath, 'types'),
      styles: path.join(srcPath, 'styles'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: htmlPath,
    }),
    // new TsCheckerPlugin(),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
        filename: '[name]-[hash].css',
      }),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  devServer: {
    port: 9000,
    hot: true,
    historyApiFallback: true,
  },
};
