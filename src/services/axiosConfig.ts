import { cancelRequest } from '@/utils/api'
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  signal: cancelRequest(),
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('🚀 ~ config:', config)
    return config
  },
  (error: AxiosError) => {
    console.log('🚀 ~ error:', error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('🚀 ~ response:', response)
    return response
  },
  (error) => {
    console.log('🚀 ~ error:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance
