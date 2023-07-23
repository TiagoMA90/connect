import axios from "axios";

axios.defaults.baseURL = "https://djangorestframework-api-38c4a098777a.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();