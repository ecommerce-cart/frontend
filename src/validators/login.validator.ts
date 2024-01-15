import { InferType, string } from 'yup'

const loginFormSchema = {
  email: string().required().email(),
  password: string().min(3),
}

// export type LoginFormInputType = InferType<typeof loginFormSchema>;



export default loginFormSchema
