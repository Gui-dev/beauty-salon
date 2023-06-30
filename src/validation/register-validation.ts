import { z } from 'zod'

export const registerValidation = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Digite um e-mail válido')
    .toLowerCase(),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(6, 'A senha precisa de no mínimo 6 caracteres'),
  confirm_password: z
    .string()
    .nonempty('A conirmação de senha é obrigatória')
    .min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

export type RegisterValidationData = z.infer<typeof registerValidation>
