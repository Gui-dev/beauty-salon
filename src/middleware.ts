import { NextRequest, NextResponse } from 'next/server'
import { api } from './services/api'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

interface IRequestConfig extends AxiosRequestConfig {
  onFailure?: (error: AxiosError) => void
  onSuccess?: (response: AxiosResponse) => void
}
const refreshSubscribers: Array<(token: string) => void> = []
let failedRequest: Array<IRequestConfig> = []

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('beauty_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

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
          error.response.data.code === 'Authorization token expired'
        ) {
          try {
            const refresh = request.cookies.get('beauty_refresh_token')?.value
            const { data } = await api.post('/refresh', {
              refresh_token: refresh,
            })
            const { token, refresh_token } = data
            request.cookies.set('beauty_token', token)
            request.cookies.set('beauty_refresh_token', refresh_token)
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
        request.cookies.delete('beauty_token')
        request.cookies.delete('beauty_refresh_token')
        request.cookies.delete('beauty_user')
      }

      return Promise.reject(error)
    },
  )

  return NextResponse.next()
}

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token))
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
