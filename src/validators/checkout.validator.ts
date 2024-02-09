import { string } from 'yup'

const formSchema = {
  address: string().required()
}

export default formSchema
