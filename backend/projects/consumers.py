import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.core.serializers.json import DjangoJSONEncoder


class ProjectConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["project_id"]
        self.group_name = f"project_{self.room_name}"

        async_to_sync(self.channel_layer.group_add)(self.group_name, self.channel_name)

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name, self.channel_name
        )

    def receive(self, text_data):
        # Handle incoming messages if needed
        pass

    def send_task_update(self, event):
        serialized_event = json.dumps(event, cls=DjangoJSONEncoder)
        self.send(text_data=serialized_event)
