import axios from "axios";

const isDev = process.env.NODE_ENV === "development"

const axiosInstance = axios.create({
  baseURL: isDev && process.env.REACT_APP_BASE_URL_TEMP,
});


export default axiosInstance