export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export type AddTaskPayload = {
  title: string;
  description: string;
  status: TaskStatus;
};

export type EditTaskPayload = {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
};

export type TaskIdPayload = {
  id: string;
};
