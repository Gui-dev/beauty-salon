import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import cookies from 'js-cookie'

interface IRequestConfig extends AxiosRequestConfig {
  onFailure?: (error: AxiosError) => void
  onSuccess?: (response: AxiosResponse) => void
}

const token = cookies.get('beauty_token')

export const api = axios.create({
  baseURL: 'http://192.168.0.102:3333',
})

const refreshSubscribers: Array<(token: string) => void> = []
let failedRequest: Array<IRequestConfig> = []

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError | unknown) => {
    const originalRequest = (error as AxiosError).config as IRequestConfig
    if (error instanceof AxiosError && error.response?.status === 401) {
      if (
        error.response.data &&
        error.response.data.error === 'Token exprired'
      ) {
        try {
          const refresh = cookies.get('beauty_refresh_token')
          const { data } = await api.post('/users/refresh', {
            refresh_token: refresh,
          })
          const { token, refresh_token } = data
          cookies.set('beauty_refresh_token', refresh_token)
          onRefreshed(token)
          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer: ${token}`
          }
          return axios(originalRequest)
        } catch (error) {
          failedRequest.forEach((request) => {
            request.onFailure?.(error as AxiosError)
          })
          failedRequest = []
        }
      }
    } else {
      cookies.remove('beauty_token')
      cookies.remove('beauty_refresh_token')
      cookies.remove('beauty_user')
    }

    return Promise.reject(error)
  },
)

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token))
}
