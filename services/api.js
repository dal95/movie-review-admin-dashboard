import axios from 'axios'
import { getToken } from '../src/helpers/auth'
const BASE_URL = import.meta.env.VITE_APP_BASE_URL

const API = axios.create({
  baseURL: BASE_URL
})

API.interceptors.request.use(
  config => {
    const token = getToken()

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }

    return config
  },
  error => Promise.reject(error)
)

API.interceptors.response.use(response => {
  // Check apakah ada tokennya apa ngga
  // Kalo ada save ke localstorage
  if (response.data.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data.data))
  }
  return response.data
})

export default API
