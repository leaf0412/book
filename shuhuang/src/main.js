import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import "./assets/styles/font/iconfont.css";

// import upperFirst from "lodash/upperFirst";
// import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  // 其组件目录的相对路径
  "./components/base",
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Za-z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  try {
    // 获取组件的 PascalCase 命名
    const componentName = componentConfig.default.name;
    if (!componentName) return;
    // 全局注册组件
    Vue.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    );
  } catch (err) {
    window.console.error(err);
  }
});

/* rem */
import "./assets/js/flexible.js";

/* fastclick */
import fastclick from "fastclick";
if (addEventListener in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      fastclick(document.body);
    },
    false
  );
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
