from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory

from .views import UsersModelViewSet


class TestUsersViewSet(TestCase):
    def setUp(self) -> None:
        self.user = {
            "first_name": "Михаил",
            "last_name": "Булгаков",
            "email": "bulgakov1891@mail.ru",
            "username": "Булгаков_Михаил",
        }
        self.url = "http://127.0.0.1:8000/api/users/"

    def test_users_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UsersModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self) -> None:
        pass
