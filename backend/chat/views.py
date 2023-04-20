from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ChatMessage
from django.db.models import Q
from .serializers import ChatMessageSerializer


class Message(APIView):
    def get(self, request, recipient_id):
        chat_messages = ChatMessage.objects.filter(Q(sender_id=request.user.id) &
                                                   Q(recipient_id=recipient_id) |
                                                   Q(recipient_id=request.user.id) &
                                                   Q(sender_id=recipient_id)).order_by('created_at')

        serializer = ChatMessageSerializer(chat_messages, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
