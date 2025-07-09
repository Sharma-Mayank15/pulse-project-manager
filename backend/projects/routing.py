from django.urls import path

from .consumers import ProjectConsumer

websocket_urlpatterns = [
    path("ws/task_updates/<uuid:project_id>", ProjectConsumer.as_asgi()),
]
