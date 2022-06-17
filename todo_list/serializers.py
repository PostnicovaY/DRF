from dataclasses import field

from rest_framework.serializers import ModelSerializer

from users.models import Users

from .models import TODO, Project


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class TODOModelSerializer(ModelSerializer):
    class Meta:
        model = TODO
        fields = "__all__"