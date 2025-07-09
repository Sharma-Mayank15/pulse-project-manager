import { useMutation } from '@tanstack/react-query';

import { api } from '../base-api';
import {
  LoginPayload,
  LogoutPayload,
  RefreshPayload,
  RegisterPayload,
} from './types';

// Functions.
export const refreshTokenRequest = async (payload: RefreshPayload) =>
  await api.post('/token/refresh/', payload);

// Hooks.
export const useLoginRequest = () =>
  useMutation({
    mutationFn: async (payload: LoginPayload) => api.post('/login/', payload),
  });

export const useRegisterRequest = () =>
  useMutation({
    mutationFn: async (payload: RegisterPayload) =>
      api.post('/register/', payload),
  });

export const useEditUserDetailsRequest = (id) =>
  useMutation({
    mutationFn: async (payload: RegisterPayload) =>
      api.put(`/users/${id}/`, payload),
  });

export const useLogoutRequest = () =>
  useMutation({
    mutationFn: async (payload: LogoutPayload) => api.post('/logout/', payload),
  });
