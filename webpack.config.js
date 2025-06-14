const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        icons: {
          test: /[\\/]node_modules[\\/](lucide-react|react-icons)[\\/]/,
          name: 'icons',
          chunks: 'all',
          priority: 20
        },
        common: {
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      '...', // Keep default minimizers
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', {
            discardComments: { removeAll: true },
            cssDeclarationSorter: false,
            reduceIdents: false,
          }]
        }
      })
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/page'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              ['import', { libraryName: 'lucide-react', libraryDirectory: '', camel2DashComponentName: false }, 'lucide'],
              ['import', { libraryName: 'react-icons', libraryDirectory: '', camel2DashComponentName: false }, 'react-icons']
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  }
};
