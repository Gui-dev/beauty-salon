'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FiEdit2 } from 'react-icons/fi'
import cookies from 'js-cookie'

import userProfile from '@/assets/user.png'
import { useAuth } from '@/hooks/auth'
import {
  EditPhotoValidationData,
  editPhotoValidation,
} from '@/validation/edit-profile-validation'
import Image, { StaticImageData } from 'next/image'
import colors from 'tailwindcss/colors'
import { toast } from 'react-toastify'
import { api } from '@/services/api'

export const EditPhotoForm = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [fileUpload, setFileUpload] = useState<string | StaticImageData>(
    userProfile,
  )
  const { register, handleSubmit } = useForm<EditPhotoValidationData>({
    resolver: zodResolver(editPhotoValidation),
  })

  const handleUpdatePhoto = async (data: EditPhotoValidationData) => {
    if (data.image) {
      try {
        const image = data.image?.[0]
        const imageUrl = URL.createObjectURL(image)
        setFileUpload(imageUrl)
        const fileToUpload = new FormData()
        fileToUpload.set('avatar_url', image)
        const result = await api.put('uploads', fileToUpload)
        cookies.set('beauty_user', JSON.stringify(result.data))
        toast.success('Avatar atualizado com sucesso')
        setFileUpload(result.data.avatar_url)
        router.push('/dashboard')
      } catch (error) {
        console.log(error)
        toast.error('Erro ao tentar atualizar imagem')
      }
    } else {
      toast.error('Você precisa selecionar uma imagem')
    }
  }

  return (
    <form className="flex w-[60%] flex-col items-center justify-center gap-4">
      {fileUpload && (
        <div className="relative">
          <Image
            src={user?.avatar_url ? user.avatar_url : fileUpload}
            alt={`Edite sua foto de perfil`}
            width={112}
            height={112}
            className="h-28 w-28 rounded-full border-2 border-solid border-primary-900 bg-cover hover:border-primary-800"
          />
          <label
            htmlFor="image"
            className="absolute -right-5 bottom-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary-900 p-2 hover:bg-primary-800"
          >
            <FiEdit2 size={16} color={colors.white} />
            <input
              type="file"
              id="image"
              className="hidden"
              {...register('image', {
                onChange: handleSubmit(handleUpdatePhoto),
              })}
            />
          </label>
        </div>
      )}

      {/* <div>{errors?.image && <span>{errors.image?.message}</span>}</div> */}
    </form>
  )
}
