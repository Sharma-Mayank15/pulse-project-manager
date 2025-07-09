import uuid
from django.db import models

from projects.models import Project
from django.contrib.auth import get_user_model

User = get_user_model()


class Task(models.Model):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    REVIEW = "REVIEW"
    DONE = "DONE"
    STATUS_CHOICES = [
        (TODO, "To Do"),
        (IN_PROGRESS, "In Progress"),
        (REVIEW, "Review"),
        (DONE, "Done"),
    ]

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=250)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=TODO)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
    )
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="task_created_by"
    )
    edited_by = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="task_edited_by"
    )
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self) -> str:
        return self.title
