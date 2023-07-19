'use client'

import { DayPicker } from 'react-day-picker'
import { useEffect, useState } from 'react'
import { format, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Header } from '@/components/header'
import { Card } from '@/components/card'
import { useAuth } from '@/hooks/auth'

import 'react-day-picker/dist/style.css'

export default function Dashboard() {
  const { user, date, handleSetDate, schedules } = useAuth()
  const [selected, setSelected] = useState<Date>()

  let footer = <p className="text-sm text-gray-400">Selecione uma data</p>
  if (selected) {
    footer = (
      <p className="text-sm text-gray-400">
        Data selecionada foi {format(selected, 'PP', { locale: ptBR })}.
      </p>
    )
  }

  useEffect(() => {
    if (selected) {
      handleSetDate(selected)
    }
  }, [handleSetDate, selected])

  return (
    <div className="w-screen">
      <div>
        <Header />
        <div className="mb-3 mt-4 px-[10%]">
          <h2 className="font-light text-primary-900">
            Bem vindo(a), <strong className="text-lg">{user?.name}</strong>
          </h2>
          <p className="text-base text-gray-600">
            Esta é sua lista de horário para o dia{' '}
            {isToday(date) ? 'de hoje' : ''}{' '}
            {format(date, 'dd/MM/yyyy', { locale: ptBR })}
          </p>
        </div>

        <div className="px-[10%]">
          <h2 className="mb-4 text-lg text-secondary">Próximos horários</h2>
          <div className="flex justify-between">
            <div className="max-h-[60vh] w-[50%] overflow-y-auto scroll-smooth px-4 scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-primary-900 scrollbar-track-rounded scrollbar-thumb-rounded">
              {schedules.length > 0 ? (
                schedules.map((schedule) => {
                  return <Card key={schedule.id} {...schedule} />
                })
              ) : (
                <p>Nào tem horario nesse dia</p>
              )}
            </div>
            <div className="w-[50%]">
              <DayPicker
                locale={ptBR}
                mode="single"
                selected={date}
                onSelect={setSelected}
                disabled={[{ before: new Date() }, { dayOfWeek: [0] }]}
                fromMonth={new Date()}
                footer={footer}
                className="flex h-fit items-center justify-center rounded-sm bg-primary-900 text-white shadow-lg"
                classNames={{
                  day: 'day',
                  day_today: 'today',
                }}
                modifiersClassNames={{
                  selected: 'selected',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
