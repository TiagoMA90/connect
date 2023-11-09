import axios from "axios";

axios.defaults.baseURL =
  "https://djangorestframework-api-38c4a098777a.herokuapp.com/"; // uncomment for connecting to heroku
// axios.defaults.baseURL = "https://8000-tiagoma90-drfapi-t2m4g7nu3gi.ws-eu105.gitpod.io"; // uncomment for connecting to gitpod
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
