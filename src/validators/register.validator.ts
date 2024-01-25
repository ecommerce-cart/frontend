import { string } from 'yup'

const formSchema = {
  name: string().required().min(4),
  email: string().required().email(),
  phone: string().required(),
  password: string().min(3),
}

export default formSchema
