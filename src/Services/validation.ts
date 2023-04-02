import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().nonempty('This field is required').email(),
    password: z.string().nonempty('This field is required'),
});

const signupSchema = z.object({
    email: z.string().nonempty('This field is required').email(),
    password: z.string().nonempty('This field is required'),
    username: z.string().nonempty('Username is required'),
});

const resetEmailSchema = z.object({
    email: z.string().nonempty('This field is required').email(),
});

const resetPasswordSchema = z.object({
    password: z.string().nonempty("Password is required"),
});

const fullnameSchema = z.object({
    fullname: z.string().nonempty("Password is required"),
});
export { loginSchema, signupSchema, resetEmailSchema, resetPasswordSchema, fullnameSchema };