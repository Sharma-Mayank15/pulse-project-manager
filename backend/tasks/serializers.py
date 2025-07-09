from rest_framework import serializers

from accounts.serializer import UserSerializer
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    edited_by = UserSerializer(read_only=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance:
            # If instance is not None, it means we are updating an existing object
            self.fields["title"].required = False
            self.fields["description"].required = False
            self.fields["status"].required = False
        self.fields["project"].required = False

    class Meta:
        model = Task
        fields = "__all__"
