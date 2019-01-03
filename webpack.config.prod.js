import path from 'path';

export default {
  // mode: 'development',
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/client/index'),
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      { test: /\.ts$/, include: path.join(__dirname, 'src'), use: 'ts-loader' },
      { test: /(\.css)$/, use: ['style', 'css'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file' },
      { test: /\.(woff|woff2)$/, use: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=image/svg+xml' },
    ],
  },
};
