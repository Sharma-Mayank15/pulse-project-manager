from django.db.models.signals import post_save
from django.dispatch import receiver

from .serializers import TaskSerializer
from .models import Task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


@receiver(post_save, sender=Task)
def task_change_handler(sender, instance, **kwargs):
    project_id = instance.project_id
    channel_layer = get_channel_layer()
    task_serializer = TaskSerializer(instance)
    async_to_sync(channel_layer.group_send)(
        f"project_{project_id}",
        {
            "type": "send_task_update",
            "message": task_serializer.data,
        },
    )
