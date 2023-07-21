'use client'

import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { formatISO, getHours, parseISO, setHours } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { Input } from '@/components/input-component'
import {
  CreateScheduleValidationData,
  createScheduleValidation,
} from '@/validation/create-schedule-validation'
import { useAuth } from '@/hooks/auth'
import { api } from '@/services/api'

export default function Schedules() {
  const router = useRouter()
  const { availableSchedules, date, handleSetDate, schedules } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateScheduleValidationData>({
    resolver: zodResolver(createScheduleValidation),
  })
  const currentDate = new Date().toISOString().split('T')[0]
  const filteredDate = availableSchedules.filter((hour) => {
    const isScheduleAvailable = !schedules.find((scheduleItem) => {
      const scheduleDate = new Date(scheduleItem.date)
      const scheduleHour = getHours(scheduleDate)
      return scheduleHour === Number(hour)
    })
    return isScheduleAvailable
  })

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    handleSetDate(parseISO(event.target.value))
  }

  const handleCreateSchedule = async ({
    name,
    phone,
    day,
    hour,
  }: CreateScheduleValidationData) => {
    try {
      const dateFormatted = formatISO(setHours(new Date(date), Number(hour)))
      await api.post('/schedules', {
        name,
        phone,
        date: dateFormatted,
      })
      toast.success('Horário marcado com sucesso')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Erro ao tentar marcar o horário')
    }
  }

  return (
    <>
      <Header />
      <div className="mt-4 flex flex-col items-center justify-center gap-4 px-[10%]">
        <h1 className="mb-6 self-start text-2xl font-bold text-primary-900">
          Agendamento de horário
        </h1>
        <form
          className="flex w-[60%] flex-col gap-3"
          onSubmit={handleSubmit(handleCreateSchedule)}
        >
          <Input
            type="text"
            placeholder="Nome"
            label="name"
            {...register('name')}
            error={errors.name && errors.name.message}
          />
          <Input
            type="tel"
            placeholder="Telefone"
            label="phone"
            {...register('phone')}
            error={errors.phone && errors.phone.message}
          />
          <div className="flex flex-row gap-4">
            <Input
              type="date"
              placeholder="Dia"
              label="day"
              min={currentDate}
              defaultValue={currentDate}
              {...register('day', { onChange: handleChangeDate })}
              error={errors.day && errors.day.message}
            />
            <select
              className="rounded-lg border border-solid border-primary-800 p-2 text-primary-900"
              {...register('hour')}
            >
              <option defaultValue="">Horários disponiveis</option>
              {filteredDate.map((hour) => {
                return (
                  <option value={hour} key={hour}>
                    {hour}:00
                  </option>
                )
              })}
            </select>
            {errors.hour && (
              <span className="mt-2 self-start text-sm text-red-500">
                {errors.hour.message}
              </span>
            )}
          </div>

          <div className="flex flex-row items-center justify-center gap-4">
            <Button title="Cancelar" />
            <Button title="Agendar" isPrimary={true} />
          </div>
        </form>
      </div>
    </>
  )
}
