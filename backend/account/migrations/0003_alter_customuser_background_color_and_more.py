# Generated by Django 4.2 on 2023-04-19 10:28

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_customuser_background_color_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='background_color',
            field=models.CharField(default='orange', max_length=20),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='friends',
            field=models.ManyToManyField(null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
