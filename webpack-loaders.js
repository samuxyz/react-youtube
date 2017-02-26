const path = require('path');

exports.babel = {
  test: /\.jsx?$/,
  include: [
    path.resolve(__dirname, './src'),
  ],
  use: 'babel-loader',
};

exports.style = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    'style-loader',
    'css-loader'
  ],
};

exports.eslint = (path) => {
  return {
    test: /\.jsx?$/,
    use: 'eslint-loader',
    enforce: 'pre',
    include: path,
  };
};
