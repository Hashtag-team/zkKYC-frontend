import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерцептор для обработки ошибок
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error:', error.response?.data || error.message)
    return Promise.reject(error)
  },
)

// Опционально: Интерцептор для авторизации
axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config
})

export default axiosInstance
