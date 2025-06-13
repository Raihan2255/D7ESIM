export interface IDashboard {
  id: number
  package: number
  order_live: string
  price: number
  voice: number
  sms: number
  countries: string
  status: string
  unique: any
  transaction: any
  time_allowance_unit: string
  time_allowance_duration: number
  validity_in_days: number
  data_in_gb: number
  usage_data: UsageData
  order_details: OrderDetails
}


export interface UsageData {
  work_order: string
  data_usage_percent: number
  sms_usage_percent: number
  voice_usage_percent: number
}

export interface OrderDetails {
  id: string
  customer_ref: string
  product: string
  package: Package
  euicc_profile: EuiccProfile
  sim_registry: SimRegistry
  created_date: string
  status: string
  updated_date: string
  qr_code: string
}

export interface Package {
  id: string
  sim: string
  expiry_date: string
  created_date: string
  window_activation_start: string
  window_activation_end: string
  status: string
  voice_usage_remaining: string
  data_usage_remaining: string
  sms_usage_remaining: string
  time_allowance: string
  package_template: PackageTemplate
}

export interface PackageTemplate {
  id: string
  name: string
  voice_usage_allowance: string
  data_usage_allowance: string
  sms_usage_allowance: string
  time_allowance: TimeAllowance
  activation_type: string
  activation_time_allowance: string
  date_earliest_available: string
  date_latest_available: string
  date_earliest_activation: string
  supported_countries: string[]
}

export interface TimeAllowance {
  unit: string
  duration: string
}

export interface EuiccProfile {
  iccid: string
  imsi: string
  state: string
  last_operation_date: string
  activation_code: string
  reuse_remaining_count: string
  reuse_enabled: string
  profile_reuse_policy: ProfileReusePolicy
  cc_required: string
  release_date: string
}

export interface ProfileReusePolicy {
  reuse_type: string
  max_count: string
}

export interface SimRegistry {
  iccid: string
  sim_status: string
  provisioned_date: string
  sim_type: string
}