import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '../base-api';
import { AddProjectPayload, ProjectIdPayload } from './types';

export const useProjectListRequest = () =>
  useQuery({
    queryKey: ['projectList'],
    queryFn: () => api.get('/projects/'),
  });

export const useAddProjectRequest = () =>
  useMutation({
    mutationFn: (payload: AddProjectPayload) => api.post('/projects/', payload),
  });

export const useProjectRequest = (payload: ProjectIdPayload) =>
  useQuery({
    queryKey: ['projects', payload],
    queryFn: () => api.get(`/projects/${payload.id}/`),
  });

export const useEditProjectRequest = (id: string) =>
  useMutation({
    mutationFn: (payload: AddProjectPayload) =>
      api.put(`/projects/${id}/`, payload),
  });

export const useDeleteProjectRequest = (payload) =>
  useMutation({ mutationFn: () => api.delete(`/projects/${payload.id}/`) });
