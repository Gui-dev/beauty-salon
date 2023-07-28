import { ReactNode } from 'react'
import { AuthProvider } from './auth-context'
import { ScheduleProvider } from './schedule-context'

interface IContextProvidersProps {
  children: ReactNode
}

export const ContextProviders = ({ children }: IContextProvidersProps) => {
  return (
    <AuthProvider>
      <ScheduleProvider>{children}</ScheduleProvider>
    </AuthProvider>
  )
}
