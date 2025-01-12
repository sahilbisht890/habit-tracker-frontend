import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import toast
import endpoints from './endpoints';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 60000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (endpoints[config.url]) {
      config.url = endpoints[config.url];
    } else {
      console.error(`Endpoint ${config.url} not found in endpoints.js`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      console.log('response',response);
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        console.error('Unauthorized! Redirecting to login...');
        toast.error('Unauthorized! Please log in again.'); 
      } else if (data?.message) {
        toast.error(data.message); 
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } else {
      toast.error('Network error. Please check your connection.'); 
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
