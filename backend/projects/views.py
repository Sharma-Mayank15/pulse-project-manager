from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from tasks.models import Task
from tasks.serializers import TaskSerializer

from .models import Project
from .serializers import ProjectSerializer


class ProjectListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        # Automatically set created_by to the current user on creation
        serializer.save(created_by=self.request.user)


class ProjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_update(self, serializer):
        # Automatically set created_by to the current user on creation
        serializer.save(edited_by=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        tasks_serializer = TaskSerializer(
            Task.objects.filter(project=instance), many=True
        )
        data = serializer.data
        data["tasks"] = tasks_serializer.data
        return Response(data)
