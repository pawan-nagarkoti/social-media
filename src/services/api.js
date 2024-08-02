import axios from "axios";
import { appUrl } from "../utils/constant";
import Cookies from "js-cookie";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: appUrl,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add the token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Add any custom error handling logic here
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      // No response received from server
      console.error("Network Error:", error.request);
    } else {
      // Error setting up the request
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Define common API methods
const _get = (url, config = {}) => apiClient.get(url, config);
const _delete = (url, config = {}) => apiClient.delete(url, config);
const _put = (url, data = {}, config = {}) => apiClient.put(url, data, config);
const _post = (url, data = {}, config = {}) => apiClient.post(url, data, config);
const _patch = (url, data = {}, config = {}) => apiClient.patch(url, data, config);

export { _get, _delete, _put, _post, _patch };
