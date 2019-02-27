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

export const getBookrackList = params => {
  return axios
    .post(`${config.apiUrl}${perfix}/findBooks`, params)
    .then(res => res.data);
};

export const bookPlay = params => {
  return axios
    .post(`${config.apiUrl}${perfix}/play`, params)
    .then(res => res.data);
};
