from rest_framework.serializers import ModelSerializer
from .models import ChatMessage


class ChatMessageSerializer(ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'
