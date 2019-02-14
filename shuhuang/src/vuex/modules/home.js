import { getBooksList } from "@/interface/home.js";

export default {
  state: {
    homeList: [],
    isStop: false,
    refresh: "refresh",
    page: 0,
    pageSize: 10
  },
  mutations: {
    updataHomeList(state, list) {
      state.homeList = list;
    }
  },
  actions: {
    async updataHomeList({ commit, state }, data) {
      let result = state.homeList;
      if (result.length >= 50) state.isStop = true;
      let params = {
        page: ++state.page
      };
      const { code, list } = await getBooksList(params);
      if (code === 0) {
        if (state.refresh === data) {
          result.unshift(...list);
        } else {
          if (list.length > 0) {
            result.push(...list);
          } else {
            state.isStop = true;
          }
        }
      }
      commit("updataHomeList", result);
    }
  }
};
