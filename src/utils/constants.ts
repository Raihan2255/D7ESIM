interface DropdownOption {
  label: string;
  value: string;
}
// import auth from "@/core/utils/auth";

export const languageKey = "admin-language";

export const redirectUrl = "redirectUrl";

export const APP_BASE_URL_KEY = "appBaseUrl";
// API URL
// export const apiBaseUrl = getAppBaseUrl();

export const requestTimeout = 60000;

export const urlAcademicYear = `/portal/admin`;

export const mediaTenancy = "tenancy/assets/";

// export const MEDIA_URL = getAppBaseUrl() + "tenancy/assets/";

export const LOGIN_URL = "/auth/login";

export const POS_WS_BASE_URL = "";

export const statusOptions: DropdownOption[] = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "shipped", label: "Shipped" },
  { value: "cancelled", label: "Cancelled" },
  { value: "delivered", label: "Delivered" },
  { value: "return_requested", label: "Return Requested" },
  { value: "return_rejected", label: "Return Rejected" },
  { value: "return_approved", label: "Return Approved" },
  { value: "return_completed", label: "Return Completed" },
];
