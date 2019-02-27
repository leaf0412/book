import { getChapterDetail, bookPlay } from "@/interface/book.js";
import config from "@/config/index.js";

export default {
  state: {
    buttonText: "",
    bookid: "",
    title: "",
    content: "",
    audioSrc: "",
    bookinfo: {}
  },
  mutations: {
    getBookContent(state, data) {
      state.title = data.title;
      state.bookinfo = data;
      state.content = data.content;
    },
    changeBookAudio(state, data) {
      state.audioSrc = data;
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
    },
    async getBookAudio({ commit }, data) {
      return new Promise(async resolve => {
        const params = data;
        let result = "";
        const { code, src } = await bookPlay(params);
        if (code === 0) {
          result = config.apiUrl + src;
        }
        commit("changeBookAudio", result);
        resolve(result);
      });
    }
  }
};
