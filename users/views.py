from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from .models import Users
from .serializers import UsersModelSerializer, UsersV2ModelSerializer


class UsersModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):

    queryset = Users.objects.all()

    def get_serializer_class(self):
        if self.basename == "v2":
            return UsersV2ModelSerializer
        return UsersModelSerializer
