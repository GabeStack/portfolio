import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensagem muito curta'),
  honey: z.string().max(0, 'Bot detectado'), // Honeypot
})

export type ContactFormData = z.infer<typeof contactSchema>
