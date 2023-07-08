'use client'

import { ReactNode, createContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import cookies from 'js-cookie'

import { api } from '@/services/api'

interface IUserProps {
  user: {
    id: string
    name: string
    email: string
    avatar_url: string
  }
  token: string
  refresh_token: string
}

interface ISignInProps {
  email: string
  password: string
}

interface IAuthContextProps {
  user: IUserProps | null
  signIn: (data: ISignInProps) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextProps)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const router = useRouter()
  const [user, setUser] = useState<IUserProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const signIn = async ({ email, password }: ISignInProps) => {
    try {
      setIsLoading(true)
      const { data } = await api.post<IUserProps>('/users/login', {
        email,
        password,
      })
      cookies.set('beauty_token', data.token)
      cookies.set('beauty_refresh_token', data.refresh_token)
      cookies.set('beauty_user', JSON.stringify(data.user))
      setUser(data)
      toast.success(`💚 Usuário \nlogado com sucesso`)
      router.push('/dashboard')
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 401) {
        toast.error(`💔 Usuário ou senha inválidos`)
      } else {
        toast.error(`🔒 Não conseguimos realizar o login. Tente mais tarde`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    cookies.remove('beauty_token')
    cookies.remove('beauty_refresh_token')
    cookies.remove('beauty_user')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
