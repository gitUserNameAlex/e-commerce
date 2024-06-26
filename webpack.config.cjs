const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.resolve(__dirname, 'src');
const entryPath = path.resolve(srcPath, 'main.tsx');
const buildPath = path.resolve(__dirname, 'build');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
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
    //если dev режим - '/'
    //когда deploy - './'
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      app: path.join(srcPath, 'app'),
      pages: path.join(srcPath, 'pages'),
      components: path.join(srcPath, 'components'),
      store: path.join(srcPath, 'store'),
      config: path.join(srcPath, 'config'),
      types: path.join(srcPath, 'types'),
      styles: path.join(srcPath, 'styles'),
      assets: path.join(srcPath, 'assets'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      favicon: './src/assets/favicon.ico',
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.(svg)$/,
        use: ['@svgr/webpack', 'file-loader'],
      },

      {
        test: /\.(png|jpe?g|gif|ttf|woff|woff2)$/i,
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
        test: /\.(png|jpg)$/,
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
