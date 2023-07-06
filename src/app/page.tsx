import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '@/contexts/auth-context'
import { Login } from '@/components/Login'

export default function Home() {
  return (
    <AuthProvider>
      <ToastContainer theme="dark" position="top-right" />
      <Login />
    </AuthProvider>
  )
}
