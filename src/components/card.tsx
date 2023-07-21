import { useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import colors from 'tailwindcss/colors'
import { getHours, isAfter, parseISO } from 'date-fns'

import { ModalEdit } from './modal-edit'
import { api } from '@/services/api'

interface ICardProps {
  id: string
  user_id: string
  name: string
  phone: string
  date: string
}

export const Card = ({ id, name, phone, date }: ICardProps) => {
  const dateParsed = parseISO(date)
  const isAfterDate = isAfter(dateParsed, new Date())
    ? 'flex items-center justify-center w-16 rounded-l-lg bg-secondary p-3 text-sm font-bold text-white'
    : 'flex items-center justify-center w-16 rounded-l-lg bg-gray-500 py-3 text-sm font-bold text-white'
  const hour = getHours(dateParsed)
  let phoneFormatted = phone.replace(/\D/g, '')
  phoneFormatted = phoneFormatted.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    if (isAfterDate) {
      setOpenModal(!openModal)
    } else {
      toast.warning('Opsss, não pode editar esse horário')
    }
  }

  const handleDeleteSchedule = async () => {
    try {
      if (isAfterDate) {
        await api.delete(`/schedules/${id}`)
        toast.info('Deletado com sucesso')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white shadow-lg">
        <div className="flex flex-row items-center gap-4">
          <span className={isAfterDate}>{hour}h</span>
          <div className="flex flex-col gap-1">
            <p className="text-base text-primary-900">{name}</p>
            <p className="text-xs text-primary-800">{phoneFormatted}</p>
          </div>
        </div>
        <div className="mr-3 flex flex-row items-center gap-4">
          <button onClick={handleOpenModal}>
            <AiOutlineEdit size={20} color={colors.green[800]} />
          </button>
          <button onClick={handleDeleteSchedule}>
            <RiDeleteBinLine size={20} color={colors.red[800]} />
          </button>
        </div>
      </div>
      {openModal && (
        <ModalEdit
          onCloseModal={handleOpenModal}
          id={id}
          name={name}
          hour={hour}
        />
      )}
    </>
  )
}
