from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from .models import Users
from .serializers import UsersModelSerializer


class UsersModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    serializer_class = UsersModelSerializer
    queryset = Users.objects.all()
