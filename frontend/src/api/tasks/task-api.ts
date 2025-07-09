import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../base-api';
import { AddTaskPayload, EditTaskPayload, TaskIdPayload } from './types';

export const useAddTaskRequest = (projectId) =>
  useMutation({
    mutationFn: (payload: AddTaskPayload) =>
      api.post(`/projects/${projectId}/tasks/`, payload),
  });

export const useTaskRequest = (payload: TaskIdPayload) =>
  useQuery({
    queryKey: ['tasks', payload],
    queryFn: () => api.get(`/tasks/${payload.id}/`),
  });

export const useEditTaskRequest = () =>
  useMutation({
    mutationFn: (payload: EditTaskPayload) =>
      api.put(`/tasks/${payload.id}/`, { ...payload }),
  });

export const useDeleteTaskRequest = () =>
  useMutation({
    mutationFn: (payload: TaskIdPayload) => api.delete(`/tasks/${payload.id}/`),
  });
