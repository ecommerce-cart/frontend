import { string } from 'yup'

const formSchema = {
  country: string().required(),
  address: string().required(),
  city: string().required(),
  state: string().required(),
  zipCode: string().optional(),
}

export default formSchema
