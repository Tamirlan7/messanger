from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import ChatMessage
from django.contrib.auth import get_user_model

User = get_user_model()


@database_sync_to_async
def save_messages(user, recipient, message):
    sender = User.objects.get(id=user)
    recipient = User.objects.get(id=recipient)
    ChatMessage.objects.create(recipient=recipient, sender=sender, message=message)


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if not self.scope['user'].is_authenticated:
            await self.close()

        self.user_id = self.scope['user'].id
        self.user_group_name = f'chat-{self.user_id}'

        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.user_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        message_data = json.loads(text_data)
        message = message_data['message']
        to_user_id = message_data['to']

        await save_messages(self.user_id, to_user_id, message)

        await self.channel_layer.group_send(
            f'chat-{to_user_id}',
            {
                'type': 'chat.message',
                'message_data': message_data
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event['message_data']))
