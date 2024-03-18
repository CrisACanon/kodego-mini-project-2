import axios from "axios";

function http() {
  return axios.create({
    baseURL: import.meta.env.VITE_API,
  });
}

export default http;
