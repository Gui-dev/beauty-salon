import { useContext } from 'react'

import { ScheduleContext } from '@/contexts/schedule-context'

export const useSchedule = () => {
  const schedule = useContext(ScheduleContext)
  return schedule
}
