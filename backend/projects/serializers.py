from rest_framework import serializers

from accounts.serializer import UserSerializer
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    edited_by = UserSerializer(read_only=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance:
            # If instance is not None, it means we are updating an existing object
            self.fields["title"].required = False
            self.fields["description"].required = False
            self.fields["start_date"].required = False
            self.fields["estimated_end_date"].required = False

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "start_date",
            "estimated_end_date",
            "created_by",
            "edited_by",
        ]
