import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/styles/font/iconfont.css";

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
