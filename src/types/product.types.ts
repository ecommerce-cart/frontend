export type Variation = {
  id: number
  quantity: number
  name: string
  value?: string
  price: string
  typeId: number
  typeName: number
  parentId?: number
  children?: Array<Partial<Variation>>
}

export type VariationType = {
  id: number
  name: string
  component: string
  variations: Array<Variation>
}

export type Product = {
  id: number
  name: string
  price: number
  displayedPrice: string
  description?: string
  details?: string
  images: Array<string>
  variationTypes: Array<VariationType>
  variations: Array<Variation>
}
