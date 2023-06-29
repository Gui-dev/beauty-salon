import { z } from 'zod'

export const loginValidation = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Digite um e-mail válido')
    .toLowerCase(),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

export type LoginValidationData = z.infer<typeof loginValidation>
