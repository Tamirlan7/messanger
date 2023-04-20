from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
import random

from backend import settings


def get_background_color():
    num = random.randint(1, 7)

    match num:
        case 1:
            return 'red'
        case 2:
            return 'yellow'
        case 3:
            return 'blue'
        case 4:
            return 'purple'
        case 5:
            return 'pink'
        case 6:
            return 'orange'
        case _:
            return 'gray'


class CustomUser(AbstractUser):
    username = models.CharField(max_length=60, null=False, blank=False, unique=True)
    friends = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, editable=True)
    background_color = models.CharField(max_length=20, default=get_background_color())
