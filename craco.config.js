const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the CSS minimizer
      const cssMinimizerPluginIndex = webpackConfig.optimization.minimizer.findIndex(
        minimizer => minimizer.constructor.name === 'CssMinimizerPlugin'
      );
      
      // Replace it with a more lenient configuration
      if (cssMinimizerPluginIndex > -1) {
        webpackConfig.optimization.minimizer[cssMinimizerPluginIndex] = new CssMinimizerPlugin({
          minimizerOptions: {
            preset: ['default', {
              discardComments: { removeAll: true },
              // These options can help with problematic CSS
              cssDeclarationSorter: false,
              reduceIdents: false
            }]
          }
        });
      }
      
      return webpackConfig;
    }
  }
};
