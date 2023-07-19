'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import cookies from 'js-cookie'

import { api } from '@/services/api'

interface IUserProps {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface ISchedulesParams {
  id: string
  user_id: string
  name: string
  phone: string
  date: string
}

interface ISignResponse {
  user: IUserProps | null
  token: string
  refresh_token: string
}

interface ISignInProps {
  email: string
  password: string
}

interface IAuthContextProps {
  user: IUserProps | null
  schedules: ISchedulesParams[]
  date: Date
  isLoading: boolean
  availableSchedules: Array<string>
  handleSetDate: (date: Date) => void
  signIn: (data: ISignInProps) => Promise<void>
  signOut: () => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextProps)

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const router = useRouter()
  const [user, setUser] = useState<IUserProps | null>(null)
  const [schedules, setSchedules] = useState<ISchedulesParams[]>([])
  const [date, setDate] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const availableSchedules = [
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
  ]

  useEffect(() => {
    const data = cookies.get('beauty_user')
    const user = data ? JSON.parse(data) : null
    if (!user) {
      setUser(null)
    }
    setUser(user)
  }, [])

  useEffect(() => {
    api
      .get('/schedules')
      .then((response) => {
        setSchedules(response.data)
      })
      .catch((error) => {
        console.log('ERROR: ', error)
      })
  }, [date])

  const handleSetDate = (date: Date) => {
    setDate(date)
  }

  const signIn = async ({ email, password }: ISignInProps) => {
    try {
      setIsLoading(true)
      const { data } = await api.post<ISignResponse>('/users/login', {
        email,
        password,
      })
      cookies.set('beauty_token', data.token)
      cookies.set('beauty_refresh_token', data.refresh_token)
      cookies.set('beauty_user', JSON.stringify(data.user))
      setUser(data.user)
      toast.success(`💚 Usuário logado com sucesso`)
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
        schedules,
        date,
        availableSchedules,
        isLoading,
        handleSetDate,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
