import uuid
from django.db import models

from django.contrib.auth import get_user_model

User = get_user_model()


class Project(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=150)
    description = models.TextField()
    start_date = models.DateField()
    estimated_end_date = models.DateField()
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="project_created_by"
    )
    edited_by = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="project_edited_by"
    )
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self) -> str:
        return self.title
