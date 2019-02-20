import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./vuex/store";
import "./assets/styles/font/iconfont.css";
import "./assets/styles/reset.scss";

// 手机物理返回键
import "./plugin/plus";

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  // 其组件目录的相对路径
  "./components/base",
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Za-z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  // 获取组件的 PascalCase 命名
  const name = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
    )
  );

  let componentName = componentConfig.default.name;
  if (!componentName) componentName = name;
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
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

/* toast 组件 */
import toast from "./components/toast/toast.js";

Vue.use(toast);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
