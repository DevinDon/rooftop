const nrwlReactWebpackConfig = require('@nrwl/react/plugins/webpack.js');
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

module.exports = config => {
  nrwlReactWebpackConfig(config);

  return {
    ...config,
    plugins: [
      ...config.plugins,
      new WindiCSSWebpackPlugin(),
    ],
  };
};
