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
      let result = state.homeList;
      if (code === 0) {
        if (refresh === data) {
          result.unshift(...list);
        } else {
          if (result.length >= 50) return;
          result.push(...list);
        }
      }
      commit("updataHomeList", result);
    }
  }
};
