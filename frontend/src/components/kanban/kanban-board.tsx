import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import {
  useAddTaskRequest,
  useDeleteTaskRequest,
  useEditTaskRequest,
} from '../../api/tasks/task-api';
import { TaskStatus } from '../../api/tasks/types';
import './kanban-board.css';
import { KanbanColumn } from './kanban-columns';

export const KanbanBoard = ({ tasks, projectId }) => {
  const { mutate: editTask } = useEditTaskRequest();
  const { mutate: deleteTask } = useDeleteTaskRequest();
  const { mutate: addTask } = useAddTaskRequest(projectId);

  const initialColumns = {
    [TaskStatus.TODO]: {
      id: TaskStatus.TODO,
      title: 'To Do',
      list: [],
      status: TaskStatus.TODO,
    },
    [TaskStatus.IN_PROGRESS]: {
      id: TaskStatus.IN_PROGRESS,
      title: 'In Progress',
      list: [],
      status: TaskStatus.IN_PROGRESS,
    },
    [TaskStatus.REVIEW]: {
      id: TaskStatus.REVIEW,
      title: 'In Review',
      list: [],
      status: TaskStatus.REVIEW,
    },
    [TaskStatus.DONE]: {
      id: TaskStatus.DONE,
      title: 'Completed',
      list: [],
      status: TaskStatus.DONE,
    },
  };

  const [columns, setColumns] = useState({});

  useEffect(() => {
    if (tasks) {
      initialColumns[TaskStatus.DONE].list = tasks.filter(
        (task) => task.status === TaskStatus.DONE,
      );
      initialColumns[TaskStatus.REVIEW].list = tasks.filter(
        (task) => task.status === TaskStatus.REVIEW,
      );
      initialColumns[TaskStatus.TODO].list = tasks.filter(
        (task) => task.status === TaskStatus.TODO,
      );
      initialColumns[TaskStatus.IN_PROGRESS].list = tasks.filter(
        (task) => task.status === TaskStatus.IN_PROGRESS,
      );
    }
    setValues();
  }, [tasks]);

  const setValues = () => {
    const data = initialColumns;
    setColumns(data);
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskList = Array.from(startColumn.list);
      const [removedTask] = newTaskList.splice(source.index, 1);
      newTaskList.splice(destination.index, 0, removedTask);

      const updatedColumn = {
        ...startColumn,
        list: newTaskList,
      };

      setColumns((prevState) => ({
        ...prevState,
        [updatedColumn.id]: updatedColumn,
      }));
    } else {
      const newStartList = startColumn.list.filter(
        (_, idx) => idx !== source.index,
      );
      const [draggedTask] = startColumn.list.filter(
        (_, idx) => idx === source.index,
      );

      const newEndList = Array.from(endColumn.list);
      newEndList.splice(destination.index, 0, draggedTask);

      const updatedStartColumn = {
        ...startColumn,
        list: newStartList,
      };

      const updatedEndColumn = {
        ...endColumn,
        list: newEndList,
      };

      setColumns((prevState) => ({
        ...prevState,
        [updatedStartColumn.id]: updatedStartColumn,
        [updatedEndColumn.id]: updatedEndColumn,
      }));

      editTask({ status: endColumn.id, id: draggedTask.id });
    }
  };

  const addTaskToColumn = async (column) => {
    addTask({
      title: 'Edit Me!',
      description: 'Edit Me!',
      status: column.id,
    });
  };

  const handleEditTask = (editedTaskObject, columnId) => {
    setColumns((prev) => {
      const updatedList = prev[columnId].list.map((task) => {
        if (task.id === editedTaskObject.id) {
          return editedTaskObject;
        }
        return task;
      });
      return {
        ...prev,
        [columnId]: {
          ...prev[columnId],
          list: updatedList,
        },
      };
    });

    editTask({
      description: editedTaskObject.description,
      title: editedTaskObject.title,
      id: editedTaskObject.id,
    });
  };

  const handleDeleteTask = (deletedTaskObject, columnId) => {
    setColumns((prev) => {
      const updatedList = prev[columnId].list.filter(
        (task) => task.id !== deletedTaskObject.id,
      );
      return {
        ...prev,
        [columnId]: {
          ...prev[columnId],
          list: updatedList,
        },
      };
    });

    deleteTask({ id: deletedTaskObject.id });
  };

  return (
    <div className="board">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(columns).map((column, key) => {
          return (
            <div key={key}>
              <KanbanColumn
                column={column}
                add={addTaskToColumn}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};
