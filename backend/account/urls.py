from django.urls import path
from .views import LoginView, RegisterView, LogoutView, IsAuthenticated, AddFriend, User


urlpatterns = [
    path('is-authenticated', IsAuthenticated.as_view(), name='is-authenticated'),
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('friend', AddFriend.as_view(), name='add-friend'),
    path('user', User.as_view(), name='user')
]
