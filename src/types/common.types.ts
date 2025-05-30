import { IAPIMethods } from "@/types/global.types"

export interface IAPIRoutes {
  endPoint: string;
  method: string;
}
export interface IAPIEndpoints {
  [key: string]: IAPIRoutes
}

export const API_METHODS: IAPIMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

