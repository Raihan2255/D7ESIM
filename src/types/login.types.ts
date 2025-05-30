export interface User {
  id: number;
  slug: string;
  email: string;
  is_active: boolean;
}

export interface Data {
  user: User;
  token: string;
  refresh: string;
}

export interface Error { }

export interface ILoginSuccessResponse {
  status: boolean;
  status_code: number;
  message: string;
  data: Data;
  errors: Error;
}

export interface ILoginErrorResponse {
  errors: string;
  status_code?: number;
  status?: number;
}