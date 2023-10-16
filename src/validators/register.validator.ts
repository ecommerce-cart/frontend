import { string } from 'yup'

const formSchema = {
  name: string().required().min(4),
  email: string().required().email(),
  phone: string().required(),
  password: string().min(3),
  // passwordConfirm: string()
  //   .required()
  //   .equals([ref('password')], 'passwordConfirm must equal password'),
}

export default formSchema
