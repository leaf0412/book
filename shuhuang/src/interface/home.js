import axios from "axios"

const apiUrl = "http://127.0.0.1:9090"

const perfix = "/book"

export const homeList = params => {
  return axios.post(`${apiUrl}${perfix}/hot`, params).then(res => res.data)
}