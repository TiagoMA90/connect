import axios from "axios";

axios.defaults.baseURL = "https://connect-network-ee92c70de293.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;