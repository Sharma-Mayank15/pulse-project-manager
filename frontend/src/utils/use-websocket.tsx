import { useState, useRef, useEffect } from 'react';
import { TaskStatus } from '../api/tasks/types';
//   {
//     "type": "send_task_update",
//     "message": {
//         "id": "faa65895-026a-4770-9b29-153eb8bd7583",
//         "status": "IN_PROGRESS",
//         "title": "Edit Me!",
//         "description": "Edit Me!"
//     },
//     "action": "update"
// }
enum WebSocketUpdateType {
  SEND_TASK_UPDATE = 'send_task_update',
}

export enum WebSocketActionType {
  UPDATE = 'update',
  CREATE = 'create',
  DELETE = 'delete',
}

type WebSocketValue = {
  type: WebSocketUpdateType;
  message: {
    id: string;
    status: TaskStatus;
    title: string;
    description: string;
  };
  action: WebSocketActionType;
};

export const useWebSocket = ({ projectId }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [values, setValues] = useState<WebSocketValue>();

  const socketConnection = useRef<WebSocket | null>(null);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    const baseWebSocketURL = baseURL.replace('http', 'ws');

    const webSocketPath = `/ws/task_updates/${projectId}`;
    const webSocketURL = baseWebSocketURL + webSocketPath;
    const socket = new WebSocket(webSocketURL);

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);
    socket.onerror = () => socket.close();

    socket.onmessage = (event) => setValues(JSON.parse(event.data));

    socketConnection.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return { isConnected, values };
};
