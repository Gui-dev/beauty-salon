'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FiEdit2 } from 'react-icons/fi'
import userProfile from '@/assets/user.png'

import { useAuth } from '@/hooks/auth'
import {
  EditPhotoValidationData,
  editPhotoValidation,
} from '@/validation/edit-profile-validation'
import Image from 'next/image'
import colors from 'tailwindcss/colors'

export const EditPhotoForm = () => {
  const { user } = useAuth()
  const [fileUpload, setFileUpload] = useState(user?.avatar_url || userProfile)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPhotoValidationData>({
    resolver: zodResolver(editPhotoValidation),
  })

  const handleUpdatePhoto = async (data: EditPhotoValidationData) => {
    console.log('Foto', data.image?.[0])
  }

  return (
    <form className="flex w-[60%] flex-col items-center justify-center gap-4">
      {fileUpload && (
        <div className="relative">
          <Image
            src={fileUpload}
            alt={`Edite sua foto de perfil`}
            width={112}
            height={112}
            className="h-20 w-20 rounded-full border border-solid border-primary-900"
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
