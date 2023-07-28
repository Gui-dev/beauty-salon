import { ChangeEvent, FormEvent, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import colors from 'tailwindcss/colors'

import { Button } from './button'
import { formatISO, getHours, parseISO, setHours } from 'date-fns'
import { api } from '@/services/api'
import { toast } from 'react-toastify'
import { useSchedule } from '@/hooks/schedule'

interface IModalEdit {
  id: string
  name: string
  hour: number
  onCloseModal: () => void
}

export const ModalEdit = ({ id, name, hour, onCloseModal }: IModalEdit) => {
  const { availableSchedules, date, handleSetDate, loadSchedules, schedules } =
    useSchedule()
  const [changedHour, setChangedHour] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  const handleChangeHour = (event: ChangeEvent<HTMLSelectElement>) => {
    setChangedHour(event.target.value)
  }

  const handleUpdateSchedule = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      const dateFormatted = formatISO(setHours(date, Number(changedHour)))
      await api.put(`/schedules/${id}`, {
        date: dateFormatted,
      })
      toast.success('Horario atualizado com sucesso')
      onCloseModal()
      loadSchedules()
    } catch (error) {
      toast.error('Erro ao tentar atualizar, tente mais tarde')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black bg-opacity-40">
      <div className="fixed left-[50%] top-[50%] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white">
        <div className="flex items-center justify-between rounded-tl-lg rounded-tr-lg bg-primary-900 p-6">
          <h2 className="text-lg font-bold text-white">Editar horário</h2>
          <button onClick={onCloseModal}>
            <AiOutlineClose size={25} color={colors.white} />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 py-2">
          <p className="text-2xl text-secondary">
            {hour}h {name}
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleUpdateSchedule}>
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="date" className="text-xs text-primary-800">
                Indique uma nova Data
              </label>
              <input
                type="date"
                id="date"
                min={currentDate}
                defaultValue={currentDate}
                className="w-[65%] rounded-lg border border-solid border-primary-900 p-2"
                onChange={handleChangeDate}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="date" className="text-xs text-primary-800">
                Indique um novo Horário
              </label>
              <select
                className="w-[65%] rounded-lg border border-solid border-primary-900 p-2"
                onChange={handleChangeHour}
              >
                <option disabled value="default">
                  Horários disponiveis
                </option>
                {filteredDate.map((hour) => {
                  return (
                    <option value={hour} key={hour}>
                      {hour}:00
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="flex items-center justify-center gap-4 p-6">
              <Button title="Cancelar" onClick={onCloseModal} />
              <Button
                type="submit"
                title="Editar"
                isPrimary={true}
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
