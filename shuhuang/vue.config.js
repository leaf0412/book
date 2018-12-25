module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // @是src的别名
        data: `@import "@/assets/styles/global.scss";`
      }
    }
  },
  devServer: {
    disableHostCheck: true
  }
};
