from django.urls import path

from .views import UsersModelViewSet

app_name = "users"

urlpatterns = [
    path("", UsersModelViewSet.as_view()),
]
