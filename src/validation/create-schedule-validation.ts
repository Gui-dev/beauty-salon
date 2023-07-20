import { z } from 'zod'

export const createScheduleValidation = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  phone: z.string().nonempty('O telefone é obrigatório'),
  day: z.string().nonempty('Selecione um dia'),
  hour: z.string().nonempty('Selecione uma hora'),
})

export type CreateScheduleValidationData = z.infer<
  typeof createScheduleValidation
>
