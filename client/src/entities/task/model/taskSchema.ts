import { z } from 'zod';

const forbidden = ['спать', 'курить', 'пить', 'есть', 'питаться', 'матюкаться'];

const noForbiddenWords = (value: string) => {
    return !forbidden.some(word => value.toLowerCase().includes(word.toLowerCase()))
}



export const taskSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3, { message: 'Название должно быть не менее 3 символов' })
        .max(100, { message: 'Название должно быть не более 100 символов' })
        .refine(noForbiddenWords, { message: 'Название не должно содержать запрещенные слова' }),

    text: z
        .string()
        .trim()
        .min(3, { message: 'Описание должно быть не менее 3 символов' })
        .max(1000, { message: 'Описание должно быть не более 1000 символов' })
        .refine(noForbiddenWords, { message: 'Описание не должно содержать запрещенные слова' }),
})

export type TaskSchema = z.infer<typeof taskSchema>;