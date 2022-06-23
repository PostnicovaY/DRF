from rest_framework.serializers import ModelSerializer

from .models import Users


class UsersModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ("id", "first_name", "last_name", "username", "email")


class UsersV2ModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ("first_name", "last_name", "username", "email", "is_superuser", "is_staff")
