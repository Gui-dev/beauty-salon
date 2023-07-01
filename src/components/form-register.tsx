'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineMail } from 'react-icons/ai'
import { BsPerson, BsKey } from 'react-icons/bs'

import { Input } from './input-component'
import {
  RegisterValidationData,
  registerValidation,
} from '@/validation/register-validation'
import { Button } from './button'

export const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValidationData>({
    resolver: zodResolver(registerValidation),
  })

  const handleRegisterUser = ({
    name,
    email,
    password,
    confirm_password,
  }: RegisterValidationData) => {
    console.log(name, email, password, confirm_password)
  }

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleSubmit(handleRegisterUser)}
    >
      <Input
        type="text"
        label="name"
        placeholder="Nome"
        icon={BsPerson}
        {...register('name')}
        error={errors.name && errors.name.message}
      />

      <Input
        type="email"
        label="email"
        placeholder="E-mail"
        icon={AiOutlineMail}
        {...register('email')}
        error={errors.email && errors.email.message}
      />

      <Input
        type="password"
        label="password"
        placeholder="Senha"
        icon={BsKey}
        {...register('password')}
        error={errors.password && errors.password.message}
      />

      <Input
        type="password"
        label="confirm_password"
        placeholder="Confirmar Senha"
        icon={BsKey}
        {...register('confirm_password')}
        error={errors.confirm_password && errors.confirm_password.message}
      />

      <Button title="Cadastrar" />
    </form>
  )
}
