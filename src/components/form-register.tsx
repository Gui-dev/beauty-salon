'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineMail } from 'react-icons/ai'
import { BsPerson, BsKey } from 'react-icons/bs'
import { toast } from 'react-toastify'

import { Input } from './input-component'
import {
  RegisterValidationData,
  registerValidation,
} from '@/validation/register-validation'
import { Button } from './button'
import { api } from '@/services/api'

export const FormRegister = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValidationData>({
    resolver: zodResolver(registerValidation),
  })

  const handleRegisterUser = async ({
    name,
    email,
    password,
    confirm_password,
  }: RegisterValidationData) => {
    try {
      setIsLoading(true)
      await api.post('/users', {
        name,
        email,
        password,
        confirm_password,
      })
      toast.success(`💚 Usuário ${name} \ncadastrado(a) com sucesso`)
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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

      <Button title="Cadastrar" isLoading={isLoading} />
    </form>
  )
}
