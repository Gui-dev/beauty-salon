import { z } from 'zod'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const editPhotoValidation = z.object({
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `O tamanha máximo da imagem é 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Somente .jpg, .jpeg, .png and .webp são os formatos suportados',
    ),
})

export const editProfileValidation = z
  .object({
    password: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(6, 'A senha precisa de no mínimo 6 caracteres'),
    confirm_password: z
      .string()
      .nonempty('A confirmação de senha é obrigatória')
      .min(6, 'A senha precisa de no mínimo 6 caracteres'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não combinam',
    path: ['confirm_password'],
  })

export type EditPhotoValidationData = z.infer<typeof editPhotoValidation>
export type EditProfileValidationData = z.infer<typeof editProfileValidation>
