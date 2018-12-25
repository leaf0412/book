import axios from "@/config/axios";

const ip = "192.168.43.151";
const apiUrl = `http://${ip}:9090`;

const perfix = "/book";

export const homeList = params => {
  return axios.post(`${apiUrl}${perfix}/hot`, params).then(res => res.data);
};
