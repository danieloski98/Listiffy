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

const BusinessnameSchema = z.object({
    business_name: z.string().nonempty(" Business name is required"),
});

const docSchema = z.object({
    docNumber: z.string().nonempty(" Business name is required"),
});

const basicPersonalInfo = z.object({
    fullName: z.string().nonempty("Password is required"),
    username: z.string().nonempty("Password is required"),
});

const businessInfo = z.object({
    business_name: z.string(),
    business_description: z.string(),
});

const contactSchema = z.object({
    company_email: z.string().nonempty(" Business name is required").email('Invalid email'),
    phone: z.string().nonempty(" Business name is required"),
    instagram_username: z.string(),
    twitter_username: z.string(),
    whatsapp_number: z.string(),
    website: z.string(),
});

const verifyPinSchema = z.object({
    pin: z.string().nonempty('This field is required'),
})

const commentSchema = z.object({ comment: z.string().nonempty() })
export { loginSchema, signupSchema, resetEmailSchema, resetPasswordSchema, fullnameSchema, BusinessnameSchema, contactSchema, docSchema, basicPersonalInfo, businessInfo, commentSchema, verifyPinSchema };