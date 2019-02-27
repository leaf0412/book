import { getBookrackList as _getBookrackList } from "@/interface/book.js";
export default {
  state: {
    bookList: []
  },
  mutations: {},
  actions: {
    async getBookrackList({ state }) {
      let bookrackList = localStorage.bookrackList;
      if (bookrackList) {
        const parmas = {
          bookList: bookrackList
        };
        const { code, list } = await _getBookrackList(parmas);
        if (code === 0) {
          state.bookList = list;
        }
      }
    }
  }
};
