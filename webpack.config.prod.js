import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const Globals = {
  'process.env.NODE_ENV': JSON.stringify('production'),
};

export default {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/client/index'),
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin(Globals),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'style.css',
      chunkFilename: 'style.css',
    }),
    new UglifyJsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        use: 'url?prefix=font/&limit=5000',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
};
