export type City = {
  id: number
  name: string
}

export type Country = {
  id: number
  name: string
}

export type Address = {
  id: string
  state: string
  city: City
  country: Country
  zipCode: string
  street1: string
  street2: string
  default: boolean
}

export type ShippingAddressFormData = {
  street1: string
  street2: string
  state: string
  zipCode: string
  city: {
    id: number
    name: string
  }
  country: {
    id: number
    name: string
  }
}

export type ShippingAddressLocalStorage = ShippingAddressFormData & {
  id: string
  default: boolean
}
