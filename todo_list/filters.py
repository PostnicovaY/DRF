from dataclasses import field

from django_filters import rest_framework as filters

from .models import TODO, Project


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["name"]


class TODOFilter(filters.FilterSet):
    project = filters.CharFilter(
        field_name="project__name",
    )

    class Meta:
        model = TODO
        fields = ["project"]
