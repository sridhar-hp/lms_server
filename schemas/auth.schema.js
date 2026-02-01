import {z} from 'zod';

export const loginSchema = z.object({
    Id: z.string(),
    password: z.string().min(6),

});

