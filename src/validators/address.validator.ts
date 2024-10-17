import { string } from 'yup'

const formSchema = {
  country: string().required(),
  street1: string().required(),
  street2: string().optional(),
  city: string().required(),
  state: string().required(),
  zipCode: string().optional(),
}

export default formSchema
