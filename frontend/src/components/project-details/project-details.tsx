import React, { useEffect, useState } from 'react';
import { KanbanBoard } from '../kanban/kanban-board';
import './project-details.css';
import { TaskStatus } from '../../api/tasks/types';
import { WebSocketActionType, useWebSocket } from '../../utils/use-websocket';

const calculateProgress = (tasks) => {
  const completedTasks = tasks.filter(
    (task) => task.status === TaskStatus.DONE,
  );
  const completedTaskLength = completedTasks.length;
  const totalTaskLength = tasks.length;
  if (totalTaskLength > 0) {
    return ((completedTaskLength * 100) / totalTaskLength).toFixed(2);
  }
  return 0;
};

export const ProjectDetails = ({ project }) => {
  const [connectedTasks, setConnectedTasks] = useState(project.tasks);

  const { isConnected, values } = useWebSocket({ projectId: project.id });

  useEffect(() => {
    if (isConnected && values) {
      const { message } = values;

      switch (values.action) {
        case WebSocketActionType.UPDATE:
          setConnectedTasks((prev) => {
            const index = prev.findIndex((task) => task.id === message.id);
            if (index !== -1) {
              const updatedList = [...prev];
              updatedList[index] = { ...updatedList[index], ...message };
              return updatedList;
            }
            return prev;
          });
          break;
        case WebSocketActionType.DELETE:
          setConnectedTasks((prev) =>
            prev.filter((task) => task.id !== message.id),
          );
          break;
        case WebSocketActionType.CREATE:
          setConnectedTasks((prev) => {
            const taskExists = prev.some((task) => task.id === message.id);
            if (!taskExists) {
              return [...prev, { ...message }];
            }
            return prev;
          });
          break;
      }
    }
    return () => {};
  }, [isConnected, values, project.tasks]);

  return (
    <>
      <div className="projects-header">
        <h1>{project.title}</h1>
        <div>
          <p>Started on: {project.start_date}</p>
          <p>Estimated End Date: {project.estimated_end_date}</p>
          <p>Progress: {calculateProgress(connectedTasks)}%</p>
          <p>
            Connection:{' '}
            {isConnected ? 'Online' : 'Offline (Expect Inconsistencies)'}
          </p>
        </div>
      </div>
      <p>{project.description}</p>

      <div className="projects-section">
        <h2>Tasks:</h2>
        <KanbanBoard tasks={connectedTasks} projectId={project.id} />
      </div>
    </>
  );
};
