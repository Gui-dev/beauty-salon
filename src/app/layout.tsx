import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '@/contexts/auth-context'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Beauty Salon',
  description: 'Beauty Salon, o Salão de beleza cm hora marcada 😍',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ToastContainer theme="dark" position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
