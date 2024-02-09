export type City = {
  id: number
  name: string
  country: Country
}

export type Country = {
  id: number
  name: string
}

export type Address = {
  id: number
  state: string
  city: City
  zipcode: string
  street: string
  default: boolean
}
