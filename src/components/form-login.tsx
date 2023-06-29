'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from './input-component'
import {
  LoginValidationData,
  loginValidation,
} from '@/validation/login-validation'

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationData>({
    resolver: zodResolver(loginValidation),
  })

  const handleLogin = ({ email, password }: LoginValidationData) => {
    console.log(email, password)
  }

  return (
    <form
      className="flex w-full flex-col gap-3 px-8"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Input
        type="text"
        label="email"
        placeholder="Email"
        register={register}
        error={errors.email && errors.email.message}
      />
      <Input
        type="password"
        label="password"
        placeholder="Senha"
        register={register}
        error={errors.password && errors.password.message}
      />

      <button type="submit">Login</button>
    </form>
  )
}
