"""Todo URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

# from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

from todo_list.views import ProjectModelViewSet, TODOModelViewSet
from users.views import UsersModelViewSet

shema_view = get_schema_view(
    openapi.Info(
        title="todo_marker",
        default_version="v2",
        description="TODO project",
        contact=openapi.Contact(email="007mail.ru96@mail.ru"),
        license=openapi.License(name="MT"),
    ),
    public=True,
    # permission_classes=(permissions.IsAdminUser,)
)


route = DefaultRouter()
route.register("v1/users", UsersModelViewSet, basename="v1")
route.register("v2/users", UsersModelViewSet, basename="v2")
route.register("project", ProjectModelViewSet)
route.register("todo", TODOModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(route.urls)),
    path("api-token-auth/", views.obtain_auth_token),
    # path("api/users/v1/", include("users.urls", namespace="v1")),
    # path("api/users/v2/", include("users.urls", namespace="v2")),
    path("swagger/ ", shema_view.with_ui("swagger")),
]
