import { getBook } from "@/interface/book.js";

export default {
  state: {
    bookInfo: {}
  },
  mutations: {
    updataBookInfo(state, list) {
      state.bookInfo = list;
    }
  },
  actions: {
    async getBook({ commit }, data) {
      let params = { bookid: data.bookid };
      let result = {};
      const { code, list } = await getBook(params);
      if (code === 0) {
        switch (list.isover) {
          case "0":
            list.isover = "连载中";
            break;
          default:
            list.isover = "完本";
        }
        result = list;
      }
      commit("updataBookInfo", result);
    }
  }
};
