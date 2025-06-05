
// Common types
export interface IAPIMethods {
  [key: string]: string;
}

export interface IApiResponse<T> {
  message?: string;
  data: T;
  status_code: number;
  status: boolean;
  errors: any
}