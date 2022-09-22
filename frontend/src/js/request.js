import axios from "axios";
const BaseUrl = "http://localhost:5000/api"
export const publicRequest= axios.create({baseURL:BaseUrl});
export const userRequest= axios.create({baseURL:BaseUrl, headers: {token: 'Bearer'}});
