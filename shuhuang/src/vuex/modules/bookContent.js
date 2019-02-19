import { getChapterDetail } from "@/interface/book.js";
export default {
  state: {
    buttonText: "",
    bookid: "",
    title: "",
    content: ""
  },
  mutations: {
    getBookContent(state, data) {
      state.title = data.title;
      state.content = data.content;
    },
    changeButtonText(state, data) {
      state.buttonText = data;
    }
  },
  actions: {
    async getBookContent({ commit, state }, data) {
      const params = data;
      let result = "";
      const { code, list, bookid } = await getChapterDetail(params);
      let txt = "加入书架";
      let bookrackList = localStorage.bookrackList;
      if (bookrackList) {
        bookrackList = JSON.parse(bookrackList);
        const flag = bookrackList.some(v => v === bookid);
        if (flag) txt = "取消书架";
      }
      state.buttonText = txt;
      if (code === 0) {
        state.bookid = bookid;
        result = list;
      }
      commit("getBookContent", result);
    }
  }
};
