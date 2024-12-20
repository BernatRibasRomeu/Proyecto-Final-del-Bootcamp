import { z } from 'zod';

export const donationSchema = z.object({
  amount: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  fullName: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  message: z.string().optional(),
});

export const adoptionSchema = z.object({
  firstName: z.string().min(2, 'El nombre es requerido'),
  lastName: z.string().min(2, 'Los apellidos son requeridos'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido'),
  address: z.string().min(5, 'La dirección es requerida'),
  reason: z.string().min(20, 'Por favor, proporciona más detalles sobre por qué quieres adoptar'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar los términos' }),
  }),
});