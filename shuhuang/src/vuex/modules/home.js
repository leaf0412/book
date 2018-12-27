import { homeList } from "@/interface/home.js";
const refresh = "refresh";

export default {
  state: {
    homeList: [],
    page: 0
  },
  mutations: {
    updataHomeList(state, list) {
      state.homeList = list;
    }
  },
  actions: {
    async updataHomeList({ commit, state }, data) {
      let params = {
        page: ++state.page
      };
      const { code, list } = await homeList(params);
      window.console.log(list);
      let result = state.homeList;
      if (code === 0) {
        if (refresh === data) {
          result.unshift(...list);
        } else {
          result.push(...list);
        }
      }
      window.console.log(result);
      commit("updataHomeList", result);
    }
  }
};
