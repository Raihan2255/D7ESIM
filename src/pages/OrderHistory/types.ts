export type TOrderHistory = {
  id: number
  unique: string
  user: User
  package: Package
  price: number
  voice: number
  sms: number
  countries: string
  data: number
  time_allowance_unit: string
  order_live: string
  status: string
  time_allowance_duration: number
  validity_in_days: number
  data_in_gb: number
  created_at: string
  transaction: string
}
export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
}

export type Package = {
  id: number
  name: string
  package_unique: string
}

export interface IOrderDetails {
  work_order: string
  data_usage_percent: number
  sms_usage_percent: number
  voice_usage_percent: number
}