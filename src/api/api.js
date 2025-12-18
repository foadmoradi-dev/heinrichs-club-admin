// src/api/api.js
import axios from "axios";
const url = "https://api.heinrichsclub.com/admin/api"
//const url = 'http://localhost/club/api/';
axios.defaults.withCredentials = true;
export default axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
