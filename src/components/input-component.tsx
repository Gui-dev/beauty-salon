import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { AiOutlineMail } from 'react-icons/ai'

import { LoginValidationData } from '@/validation/login-validation'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: 'email' | 'password'
  register: UseFormRegister<LoginValidationData>
  error: string | undefined
}

export const Input = ({ label, register, error, ...data }: IInputProps) => {
  return (
    <div className="flex w-full flex-col items-center rounded-lg">
      <label htmlFor={label} className="relative flex w-full items-center">
        <i aria-hidden="true" className="absolute pl-2">
          <AiOutlineMail size={20} />
        </i>
        <input
          className="w-full rounded-lg border border-gray-50 bg-white px-9  py-3"
          id={label}
          {...register(label)}
          {...data}
        />
      </label>
      {error && (
        <span className="mt-2 self-start font-sans text-sm text-red-600">
          {error}
        </span>
      )}
    </div>
  )
}
