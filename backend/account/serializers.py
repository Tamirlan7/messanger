from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import ValidationError

UserModel = get_user_model()


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'background_color')


class UserSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True, read_only=False)

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'background_color', 'friends')
        depth = 1


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, validated_data):
        user = UserModel.objects.create_user(username=validated_data['username'],
                                             password=validated_data['password'],)

        if 'email' in validated_data:
            user.email = validated_data['email']
            user.save()

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    @staticmethod
    def check_user(validated_data):
        user = authenticate(username=validated_data['username'],
                            password=validated_data['password'])

        if not user:
            raise ValidationError('User is not found')

        return user

