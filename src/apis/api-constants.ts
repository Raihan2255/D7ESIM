import { API_METHODS, IAPIEndpoints } from "@/types/common.types";

export const API_END_POINTS: IAPIEndpoints = {
  login: { endPoint: "api/accounts/auth/login", method: API_METHODS.POST },
  forgotPassword: {
    endPoint: "api/auth/generate-otp",
    method: API_METHODS.POST,
  },
  validateOtp: { endPoint: "api/auth/validate-otp", method: API_METHODS.POST },
  resendOtp: { endPoint: "api/auth/resend-otp", method: API_METHODS.POST },
  newpassword: {
    endPoint: "api/auth/change-password",
    method: API_METHODS.PATCH,
  },
  logOut: {
    endPoint: "api/accounts/auth/logout",
    method: API_METHODS.POST,
  },
};

export const API_CONSTANTS = {
  academicYear: "api/admin/registration-management/masters/academic-year",
  foreignCheck: "api/admin/foreign-key-check",
  media: "api/admin/media",
  leftMenu: "api/core/user-roles/leftmenu",
  dynamicTypography: "api/admin/settings/typography",
  permissions: "api/core/user-permissions",
  language: "api/app-translation",
  favorite: "api/core/favourite",
  userConfig: "api/core/user-configuration",
  systemConfig: "api/system_configs/system-config",
  shippingSlab: "api/system_configs/shipping-slab",
  profile: "api/profile",
  mediaConfig: "api/core/system-configuration/media",
};
export const API_ATTRIBUTES = {
  attributes: "api/admin/settings/attributes",
};

export const CORE_ROUTES = {
  config: '/system_configs/customer/system-config-detials',
  fcmToken: '/api/accounts/auth/fcn-token',
};