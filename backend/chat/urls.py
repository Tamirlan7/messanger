from django.urls import path
from .views import Message


urlpatterns = [
    path('message/<str:recipient_id>', Message.as_view(), name='get_messages')
]
