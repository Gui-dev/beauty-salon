'use client'

import cookies from 'js-cookie'

import 'react-day-picker/dist/style.css'
import Dashboard from '@/components/dashboard'
import { Login } from '@/components/login-component'
import { useAuth } from '@/hooks/auth'
import { Loading } from '@/components/loading'

export default function Home() {
  const { isLoading } = useAuth()
  const hasToken = cookies.get('beauty_token')
  const hasUser = cookies.get('beauty_user')

  if (isLoading) {
    return <Loading />
  }

  return <>{hasToken && hasUser ? <Dashboard /> : <Login />}</>
}
