from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from users.models import Users

from .models import TODO, Project
from .views import ProjectModelViewSet


class TestProject(TestCase):
    def setUp(self) -> None:
        self.user = Users.objects.create(
            first_name="Михаил", last_name="Булгаков", email="bulgakov1891@mail.ru", username="Булгаков_Михаил"
        )
        self.users = self.user
        self.url = "http://127.0.0.1:8000/api/project/"
        self.project_data = Project.objects.create(name="test_project", link="test.com")
        self.project_data.users.add(self.users)
        self.admin = Users.objects.create_superuser("admin", "admin@admin.com", "admin123456")

    def test_project_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_project_create_401(self):
        factory = APIRequestFactory()
        view = ProjectModelViewSet.as_view({"post": "create"})
        request = factory.post(
            "/api/project/",
            {
                "name": "test_case",
                "link": "https://www.google.com/",
                "users": self.user.id,
            },
        )
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_project_create_201(self):
        factory = APIRequestFactory()
        admin = self.admin
        view = ProjectModelViewSet.as_view({"post": "create"})
        request = factory.post(
            "/api/project/",
            {
                "name": "test_case",
                "link": "https://www.google.com/",
                "users": self.user.id,
            },
        )
        force_authenticate(request, admin)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def tearDown(self) -> None:
        pass


class TestTODO(APITestCase):
    def setUp(self) -> None:
        self.user = Users.objects.create(
            first_name="Михаил", last_name="Булгаков", email="bulgakov1891@mail.ru", username="Булгаков_Михаил"
        )
        self.users = self.user
        self.url = "http://127.0.0.1:8000/api/todo/"
        self.admin = Users.objects.create_superuser("admin", "admin@admin.com", "admin123456")

    def test_get_todo_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_todo_401(self):
        todo = mixer.blend(TODO, text="test_case")
        response = self.client.post(
            "/api/todo/",
            {
                "project": todo.project,
                "text": todo.text,
                "create_date": todo.create_date,
                "edit_date": todo.edit_date,
                "user_created": todo.user_created,
                "active": todo.active,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_todo_201(self):
        todo = mixer.blend(TODO, text="test_case")
        self.client.login(username="admin", password="admin123456")
        response = self.client.post(
            "/api/todo/",
            {
                "project": todo.project.id,
                "text": todo.text,
                "create_date": todo.create_date,
                "edit_date": todo.edit_date,
                "user_created": todo.user_created.id,
                "active": todo.active,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.client.logout()

    def test_detail_todo_200(self):
        todo = mixer.blend(TODO, text="test_case")
        response = self.client.get(f"{self.url}{todo.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self) -> None:
        pass
