const JS_BUNDLE = 'bundle.js';
const DEV_TOOL  = 'eval-source-map';

module.exports = function (paths, loaders, plugins) {
  return {
    output: {
      path: paths.dist,
      filename: JS_BUNDLE,
    },
    devtool: DEV_TOOL,
    performance: {
      hints: false,
    },
    module: {
      rules: [
        loaders.style,
        loaders.eslint(paths.src),
      ],
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: process.env.host,
      port: process.env.port,
      contentBase: './dist',
    },
    plugins: [
      plugins.hotModule,
      plugins.genHtml({
        filename: 'index.html',
        template: 'template.html',
      })
    ],
  };
};
