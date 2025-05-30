import { Dispatch } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { ErrorStatusCode, SuccessStatusCode } from '@/utils/handleStatus/statusCodes';
import auth from '@/utils/auth';
import { TOKEN_KEY } from '@/constants/global';
import { enqueueSnackbar } from 'notistack';

export type IQueryString = {
  is_paginated: boolean;
  ordering?: string;
  is_active: boolean;
  user_id?: string;
  search?: string;
};

type IData = {
  [key: string]: any;
};

interface HandlerOptions<T> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: IData;
  qs?: IQueryString;
  successCb?: Dispatch<T>;
  errorCb?: Dispatch<T>;
  abortController?: AbortController;
  upload?: boolean;
  requiresAuth?: boolean;
}

export const useApiHandlers = () => {

  const sendRequest = async <T extends object>({
    url,
    method,
    data,
    qs,
    successCb,
    // errorCb,
    abortController,
    upload = false,
    requiresAuth = false,
  }: HandlerOptions<T>): Promise<T | any> => {
    const token = auth.get(TOKEN_KEY);
    const BASE_API_URL = import.meta.env.VITE_API_URL + url;

    const config: AxiosRequestConfig = {
      url: BASE_API_URL,
      method,
      headers: {
        'Content-Type': upload ? 'multipart/form-data' : 'application/json',
        Accept: 'application/json',
        ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      },
      data,
      params: qs,
      signal: abortController?.signal,
    };

    try {
      const response = await axios(config);
      if (Object.values(SuccessStatusCode).includes(response.status)) {
        if (successCb) successCb(response.data);
        return response.data;
      }
      // return handleResponse<T>(response.data, errorCb);
    } catch (error) {

      if (axios.isAxiosError(error)) {
        const status = error.response?.status as ErrorStatusCode;
        switch (status) {
          case ErrorStatusCode.UNAUTHORIZED:
            localStorage.clear()
            enqueueSnackbar('Unauthorized!', { variant: 'error' });
            break;
          case ErrorStatusCode.NOT_FOUND:
            enqueueSnackbar('Not Found!', { variant: 'error' });
            break;
        }
      }

      const err: any = error;
      return err.response?.data;
    }
  };

  const getAll = <T extends object>(
    url: string,
    options: {
      qs?: IQueryString;
      abortController?: AbortController;
      requiresAuth?: boolean;
    } = {},
  ): Promise<T | null> => {
    const { qs, abortController, requiresAuth = false } = options;
    return sendRequest<T>({ url, method: 'GET', qs, abortController, requiresAuth });
  };

  const getById = <T extends object>(
    url: string,
    options: {
      abortController?: AbortController;
      requiresAuth?: boolean;
    } = {},
  ): Promise<T | null> => {
    const { abortController, requiresAuth = false } = options;
    return sendRequest<T>({ url, method: 'GET', abortController, requiresAuth });
  };

  const create = <T extends object>(
    url: string,
    data: IData,
    options: {
      successCb?: Dispatch<any>;
      errorCb?: Dispatch<any>;
      abortController?: AbortController;
      requiresAuth?: boolean;
    } = {},
  ): Promise<T | null> => {
    const { successCb, errorCb, abortController, requiresAuth = false } = options;
    return sendRequest<T>({
      url,
      method: 'POST',
      data,
      successCb,
      errorCb,
      abortController,
      requiresAuth,
    });
  };

  const createForm = <T extends object>(
    url: string,
    data: IData,
    options: {
      successCb?: Dispatch<any>;
      errorCb?: Dispatch<any>;
      abortController?: AbortController;
      requiresAuth?: boolean;
    } = {},
  ): Promise<T | null> => {
    const { successCb, errorCb, abortController, requiresAuth = false } = options;
    return sendRequest<T>({
      url,
      method: 'POST',
      data,
      successCb,
      errorCb,
      abortController,
      upload: true,
      requiresAuth,
    });
  };

  const updateById = <T extends object>(
    url: string,
    data: IData,
    options: {
      abortController?: AbortController;
      requiresAuth?: boolean;
    } = {},
  ): Promise<T | null> => {
    const { abortController, requiresAuth = false } = options;
    return sendRequest<T>({ url, method: 'PUT', data, abortController, requiresAuth });
  };

  const updatePatch = <T extends object>(
    url: string,
    data: IData,
    options: {
      abortController?: AbortController;
      requiresAuth?: boolean;
    } = {},
  ): Promise<T | null> => {
    const { abortController, requiresAuth = false } = options;
    return sendRequest<T>({ url, method: 'PATCH', data, abortController, requiresAuth });
  };

  const deleteById = <T extends object>(
    url: string,
    options: {
      data?: IData;
      abortController?: AbortController;
      requiresAuth?: boolean;
    } = {},
  ): Promise<T | null> => {
    const { data, abortController, requiresAuth = false } = options;
    return sendRequest<T>({ url, method: 'DELETE', data, abortController, requiresAuth });
  };

  const deleteByBulk = <T extends object>(
    url: string,
    data: IData,
    options: {
      abortController?: AbortController;
      requiresAuth?: boolean;
    } = {},
  ): Promise<T | null> => {
    const { abortController, requiresAuth = false } = options;
    return sendRequest<T>({ url, method: 'DELETE', data, abortController, requiresAuth });
  };

  return {
    getAll,
    getById,
    create,
    createForm,
    updateById,
    updatePatch,
    deleteById,
    deleteByBulk,
  };
};
