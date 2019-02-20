import { getBooksList } from "@/interface/home.js";
import { categoryList } from "@/interface/category.js";

export default {
  state: {
    list: [],
    booksData: [],
    refresh: "refresh",
    isStop: false,
    page: 0,
    pageSize: 10
  },
  mutations: {
    getCategoryList(state, list) {
      state.list = list;
    },
    getBooksData(state, list) {
      state.booksData = list;
    }
  },
  actions: {
    async getCategoryList({ commit }) {
      const { code, list } = await categoryList();
      let result = [];
      if (code === 0) {
        result = [...list];
      }
      commit("getCategoryList", result);
    },
    async getBooksData({ commit, state }, data) {
      let result, params;
      if (data.refresh === state.refresh) {
        state.page = 0;
        state.isStop = false;
        result = [];
        params = {
          type: data.type,
          page: ++state.page
        };
      } else {
        params = {
          type: data.type,
          page: ++state.page
        };
        result = state.booksData;
      }
      let { code, list, count } = await getBooksList(params);
      if (code === 0) {
        state.isStop = count < state.pageSize;
        result = [...result, ...list];
      }
      commit("getBooksData", result);
    }
  }
};
