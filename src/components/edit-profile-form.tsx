'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/auth'
import {
  EditProfileValidationData,
  editProfileValidation,
} from '@/validation/edit-profile-validation'
import { Input } from '@/components/input-component'
import { Button } from '@/components/button'
import { api } from '@/services/api'
import { toast } from 'react-toastify'

export const EditProfileForm = () => {
  const router = useRouter()
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileValidationData>({
    resolver: zodResolver(editProfileValidation),
  })

  const handleUpdateProfile = async ({
    password,
    confirm_password,
  }: EditProfileValidationData) => {
    try {
      await api.put('/users/reset-password', {
        password,
        confirm_password,
      })
      toast.success('Senha redefinida com sucesso')
      router.push('/dashboard')
      console.log(password, confirm_password)
    } catch (error) {
      toast.success('Erro ao tentar redefinir a senha, tente mais tarde')
    }
  }

  return (
    <form
      className="flex w-[60%] flex-col gap-4"
      onSubmit={handleSubmit(handleUpdateProfile)}
    >
      <Input
        type="text"
        label="name"
        defaultValue={user?.name}
        disabled
        style={{ cursor: 'not-allowed' }}
      />
      <Input
        type="email"
        label="email"
        defaultValue={user?.email}
        disabled
        style={{ cursor: 'not-allowed' }}
      />
      <div className="flex flex-col gap-4">
        <h2 className="text-xs text-gray-700">
          Deseja alterar sua senha atual?
        </h2>
        <Input
          type="password"
          label="password"
          placeholder="Digite sua nova senha"
          {...register('password')}
          error={errors.password && errors.password.message}
        />
        <Input
          type="password"
          label="confirm_password"
          placeholder="Digite a senha novamente"
          {...register('confirm_password')}
          error={errors.confirm_password && errors.confirm_password.message}
        />
      </div>
      <Button type="submit" title="Atualizar" isPrimary={true} />
    </form>
  )
}
