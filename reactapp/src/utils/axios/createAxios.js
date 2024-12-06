import axios from "axios";

export const defaultAxiosUrl = axios.create({
  baseURL: "https://run.mocky.io/",
});
