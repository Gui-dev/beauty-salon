import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'

import { ContextProviders } from '@/contexts/'

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
        <ContextProviders>
          <ToastContainer theme="dark" position="top-right" />
          {children}
        </ContextProviders>
      </body>
    </html>
  )
}
