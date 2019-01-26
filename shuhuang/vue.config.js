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
  configureWebpack: {
    // externals: {
    //   vue: "Vue",
    //   vuex: "Vuex",
    //   "vue-router": "VueRouter",
    //   axios: "axios"
    // }
  },
  lintOnSave: isProduction
};
