from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import Task
from .serializers import TaskSerializer


class TaskListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        # Automatically set created_by to the current user on creation
        project_id = self.kwargs.get("pk")
        serializer.save(created_by=self.request.user, project_id=project_id)
        serialized_data = serializer.data
        task_data = {}
        task_data["id"] = str(serialized_data["id"])
        task_data["status"] = serialized_data["status"]
        task_data["title"] = serialized_data["title"]
        task_data["description"] = serialized_data["description"]

        message = {
            "type": "send_task_update",
            "message": task_data,
            "action": "create",
        }
        channel_layer = get_channel_layer()
        group_name = f"project_{project_id}"
        async_to_sync(channel_layer.group_send)(group_name, message)


class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_update(self, serializer):
        # Automatically set edited_by to the current user on creation
        task = serializer.save(edited_by=self.request.user)
        serialized_data = serializer.data
        task_data = {}
        task_data["id"] = str(serialized_data["id"])
        task_data["status"] = serialized_data["status"]
        task_data["title"] = serialized_data["title"]
        task_data["description"] = serialized_data["description"]

        message = {
            "type": "send_task_update",
            "message": task_data,
            "action": "update",
        }

        channel_layer = get_channel_layer()
        group_name = f"project_{task.project_id}"
        async_to_sync(channel_layer.group_send)(group_name, message)

    def perform_destroy(self, instance):
        message = {
            "type": "send_task_update",
            "message": {"id": str(instance.id)},
            "action": "delete",
        }
        super().perform_destroy(instance)

        channel_layer = get_channel_layer()
        group_name = f"project_{instance.project_id}"
        async_to_sync(channel_layer.group_send)(group_name, message)
