from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .serializers import RegisterSerializer, LoginSerializer
from rest_framework import status, permissions, authentication
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer

UserModel = get_user_model()


class AddFriend(APIView):
    def post(self, request):
        data = request.data
        if 'id' not in data and 'username' not in data:
            return Response({'message': 'id or username were not provided'}, status=status.HTTP_400_BAD_REQUEST)

        user = UserModel.objects.get(id=request.user.id)

        if 'id' in data:
            friend_id = data['id']
            if request.user.id == friend_id:
                return Response(data={'message': 'the user you tried to friend with is you'},
                                status=status.HTTP_400_BAD_REQUEST)

            if user.friends.filter(id=friend_id).exists():
                return Response(data={'error': 'this user is already your friend'},
                                status=status.HTTP_400_BAD_REQUEST)

            friend = get_object_or_404(UserModel, id=friend_id)
            user.friends.add(friend)
            friend.friends.add(user)
            return Response(status=status.HTTP_201_CREATED)

        if 'username' in data:
            friend_username = data['username']

            if user.username == friend_username:
                return Response(data={'message': 'the user you tried to friend with is you'},
                                status=status.HTTP_400_BAD_REQUEST)

            if user.friends.filter(username=friend_username).exists():
                return Response(data={'message': 'this user is already your friend'},
                                status=status.HTTP_400_BAD_REQUEST)

            friend = get_object_or_404(UserModel, username=friend_username)
            user.friends.add(friend)
            friend.friends.add(user)
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class User(APIView):
    def get(self, request):
        user = UserModel.objects.get(id=request.user.id)
        serializer = UserSerializer(user, many=False)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class IsAuthenticated(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (authentication.SessionAuthentication,)

    def get(self, request):
        if request.user.is_authenticated:
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (authentication.SessionAuthentication,)

    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(data)
            if user:
                user = authenticate(username=data['username'], password=data['password'])
                if not user:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

                login(request, user)
                return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (authentication.SessionAuthentication,)

    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
