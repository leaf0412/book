import axios from "@/config/axios";

const apiUrl = "http://192.168.0.110:9090";

const perfix = "/book";

export const homeList = params => {
  return axios.post(`${apiUrl}${perfix}/hot`, params).then(res => res.data);
};
