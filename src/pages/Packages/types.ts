export type TPackage = {
  id: number
  name: string
  validity_period: string
  validity: number
  data_available: string
  type: string
  include_call: boolean
  is_active: boolean
  price: number
  calls: string
  texts: string
  country: Country[]
  region: Region[]
}

export interface Country {
  id: number
  name: string
  logo?: string
}

export interface Region {
  id: number
  name: string
  country: any[]
}