'use client'

import { api } from '@/services/api'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

interface ISchedulesParams {
  id: string
  user_id: string
  name: string
  phone: string
  date: string
}

interface IScheduleContextProps {
  schedules: ISchedulesParams[]
  date: Date
  isLoadingSchedules: boolean
  availableSchedules: Array<string>
  handleSetDate: (date: Date) => void
  loadSchedules: () => void
}

interface IScheduleProviderProps {
  children: ReactNode
}

export const ScheduleContext = createContext({} as IScheduleContextProps)

export const ScheduleProvider = ({ children }: IScheduleProviderProps) => {
  const [schedules, setSchedules] = useState<ISchedulesParams[]>([])
  const [date, setDate] = useState<Date>(new Date())
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(true)
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

  const handleSetDate = (date: Date) => {
    setDate(date)
  }

  const loadSchedules = useCallback(async () => {
    try {
      setIsLoadingSchedules(true)
      const { data } = await api.get('/schedules', {
        params: {
          date: new Date(date),
        },
      })
      setSchedules(data)
    } catch (error) {
      console.log('ERROR: ', error)
    } finally {
      setIsLoadingSchedules(false)
    }
  }, [date])

  useEffect(() => {
    loadSchedules()
  }, [loadSchedules])

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        date,
        availableSchedules,
        isLoadingSchedules,
        handleSetDate,
        loadSchedules,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}
