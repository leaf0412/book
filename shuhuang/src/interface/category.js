import axios from "@/plugin/axios";
import config from "@/config";

const perfix = "/dict";

export const categoryList = params => {
  return axios
    .post(`${config.apiUrl}${perfix}/all`, params)
    .then(res => res.data);
};
