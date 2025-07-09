import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { TokenManager } from '../utils/token-manager';
import { handleRefreshToken } from './helpers/refresh-token';

enum ApiErrorMessage {
  InvalidToken = 'token_not_valid',
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Adding Access Token to authorization header.
api.interceptors.request.use((req) => {
  if (TokenManager.getAccessToken() && req.headers) {
    req.headers['Authorization'] = `Bearer ${TokenManager.getAccessToken()}`;
  }
  return req;
});

export const defaultQueryFn = async ({ queryKey }: any) => {
  const response = await api.get(
    `${import.meta.env.BACKEND_URL}${queryKey[0]}`,
  );
  return response;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      retry: (_, error) => {
        console.log(error);

        if (
          error instanceof AxiosError &&
          error?.response &&
          error.response.data.code === ApiErrorMessage.InvalidToken
        ) {
          handleRefreshToken();
          return true;
        }
        return false;
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
    mutations: {
      retry: (_, error) => {
        if (
          error instanceof AxiosError &&
          error?.response &&
          error.response.data.code === ApiErrorMessage.InvalidToken
        ) {
          handleRefreshToken();
          return true;
        }
        return false;
      },
    },
  },
});
