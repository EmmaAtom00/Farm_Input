import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const baseUrl = 'https://farminput-capstone-project.onrender.com'

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// api.interceptors.request.use(
//     async(config) => {
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default api

api.interceptors.request.use(
  async (config) => {
    
    if (
      config.url?.includes('/api/auth/login/') 
      //config.url?.includes('/api/auth/signup/')
    ) {
      return config;
    }

    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api