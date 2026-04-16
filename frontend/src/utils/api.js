import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type' : 'application/json',
    },
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,

    error => {
    if (error.response && error.response.status === 401) {
      // Clear local storage/tokens if necessary
      localStorage.removeItem('token'); 
      
      // Force redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
)

export default api;
