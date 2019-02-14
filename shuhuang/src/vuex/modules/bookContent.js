import { getChapterDetail } from "@/interface/book.js";
export default {
  state: {
    content: ""
  },
  mutations: {
    getBookContent(state, data) {
      state.content = data.content
    }
  },
  actions: {
    async getBookContent({ commit }, data) {
      const params = data;
      let result = '';
      const { code, list } = await getChapterDetail(params);
      if (code === 0) {
        result = list
      }
      commit("getBookContent", result);
    }
  }
};
