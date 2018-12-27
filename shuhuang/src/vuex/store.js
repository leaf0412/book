import Vue from "vue";
import Vuex from "vuex";

const modules = {};
const requireModules = require.context("./modules", false, /[A-Za-z]\w+\.js$/);

requireModules.keys().forEach(fileName => {
  let file = requireModules(fileName);
  let name = fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
  modules[name] = file.default;
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules
});
