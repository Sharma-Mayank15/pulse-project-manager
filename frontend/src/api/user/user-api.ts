import { useQuery } from '@tanstack/react-query';
import { api } from '../base-api';

type UserIdPayload = {
  id: string;
};

export const useUserRequest = (payload: UserIdPayload) =>
  useQuery({
    queryKey: ['users', payload],
    queryFn: () => api.get(`/users/${payload.id}/`),
  });
