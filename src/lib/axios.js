import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://malarkybackend.onrender.com/api",
    withCredentials: true, // Send cookies when making requests to the server
});
