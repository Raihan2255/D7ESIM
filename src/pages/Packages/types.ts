export type TPackage = {
  id: number
  package_unique: string
  name: string
  price: number
  voice: number
  data: number
  sms: number
  original_cost: number
  country: Country[]
  is_active: boolean
  validity_in_days: number
  data_in_gb: number
  call_included: boolean
}
export interface Country {
  id: number
  name: string
  slug: string
  logo: string
}