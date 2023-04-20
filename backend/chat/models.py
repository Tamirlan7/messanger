from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class ChatMessage(models.Model):
    sender = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='sender')
    recipient = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='recipient')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.sender} -> {self.recipient}'
