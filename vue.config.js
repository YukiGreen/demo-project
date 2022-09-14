const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/graphql': {
        target: `${process.env.SW_PROXY_TARGET || 'http://10.22.5.67:31930' || 'http://127.0.0.1:12800'}`,
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]',
      });
  },
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin()],
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          echarts: {
            name: 'echarts',
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            priority: 2,
          },
          monacoEditor: {
            name: 'monaco-editor',
            test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
            priority: 1,
          },
        },
      },
    },
  },
};
