from rest_framework import mixins
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import GenericViewSet

from .models import Users
from .serializers import UsersModelSerializer


class UsersModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):

    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer
