import axios from "@/plugin/axios";
import config from "@/config";

const perfix = "/book";

export const getBook = params => {
  return axios
    .get(`${config.apiUrl}${perfix}/detail`, { params })
    .then(res => res.data);
};

export const getChapterDetail = params => {
  return axios
    .get(`${config.apiUrl}${perfix}/chapterDetail`, { params })
    .then(res => res.data);
};
