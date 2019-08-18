const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, './front-end'),
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/styles/index.scss";',
      },
    },
  },
  configureWebpack: {
    performance: {
      hints: false,
    },
  },
};
