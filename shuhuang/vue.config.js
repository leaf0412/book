const isProduction = process.env.NOOE_ENV === "production";
module.exports = {
  baseUrl: isProduction ? "./" : "/",
  css: {
    loaderOptions: {
      sass: {
        // @是src的别名
        data: `@import "@/assets/styles/global.scss";`
      }
    }
  },
  lintOnSave: isProduction,
  devServer: {
    disableHostCheck: true
  }
};
