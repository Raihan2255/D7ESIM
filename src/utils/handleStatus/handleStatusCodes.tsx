import { enqueueSnackbar } from 'notistack';
import { ErrorStatusCode, SuccessStatusCode } from './statusCodes';

export function handleStatusCode<T>(
  response: any,
  onSuccess?: (data: T) => void,
  onError?: (error: any) => void,
): T | null {
  if (response?.status_code === ErrorStatusCode.UNAUTHORIZED) {
    // Handle unauthorized access if needed
    if (response.message || (typeof response.errors === 'string' && response.errors)) {
      enqueueSnackbar(response.message || response.errors, {
        variant: 'error',
        autoHideDuration: 4000,
      });
    }
    if (onError) {
      onError(response.errors);
    }
    return response;
  } else if (Object.values(SuccessStatusCode).includes(response?.status_code)) {
    if (response.status_code === SuccessStatusCode.CREATED) {
      enqueueSnackbar(response.message, {
        variant: 'success',
        autoHideDuration: 4000,
      });
      if (onSuccess) {
        onSuccess(response.data as T);
      }
      return response.data as T;
    }

    if (response.data) {
      if (onSuccess) {
        onSuccess(response.data as T);
      }
      return response.data as T;
    } else {
      if (onSuccess) {
        onSuccess(response as T);
      }
      return response as T;
    }
  } else if (Object.values(ErrorStatusCode).includes(response?.status_code)) {
    //  alert('123') // Handle specific error codes
    if (response.status_code === ErrorStatusCode.TOO_MANY_REQUESTS) {
      enqueueSnackbar('Too many requests. Please try again later.', {
        variant: 'warning',
        autoHideDuration: 5000,
      });
      return response
    } else if (response.status_code === ErrorStatusCode.INTERNAL_SERVER_ERROR) {
      enqueueSnackbar(response?.message || 'Internal server error. Please contact support if this persists.', {
        variant: 'error',
        autoHideDuration: 5000,
      });
      return response
    } else {
      // General error handling
      if (response.message || (typeof response.errors === 'string' && response.errors)) {
        enqueueSnackbar(response.message || response.errors, {
          variant: 'error',
          autoHideDuration: 4000,
        });
      }
    }
    if (onError) {
      onError(response.errors);
    }
    return response;
  } else {
    // alert('2') // Handle specific error codes
    // Handle unknown errors
    enqueueSnackbar('An unknown error occurred', {
      variant: 'error',
      autoHideDuration: 4000,
    });
    if (onError) {
      onError(response.errors);
    }
    return response;
  }
}
