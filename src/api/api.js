// src/api/api.js
import axios from "axios";
const url = "https://heinrichs-club.com/admin/api"
//const url = 'http://localhost/club/api/';
export default axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
