import { ToastContainer } from 'react-toastify'

import { Login } from '@/components/Login'

export default function Home() {
  return (
    <div className="">
      <ToastContainer theme="dark" position="top-right" />
      <Login />
    </div>
  )
}
