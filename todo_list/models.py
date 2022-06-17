from django.db import models

from users.models import Users


class Project(models.Model):
    name = models.CharField(max_length=120)
    link = models.URLField(null=True, blank=True)
    users = models.ManyToManyField(Users)

    def __str__(self) -> str:
        return f"{self.name}"


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField("текст заметки", null=True, blank=True)
    create_date = models.DateTimeField("дата создания", auto_now_add=True)
    edit_date = models.DateTimeField("дата обновления", auto_now=True)
    user_created = models.ForeignKey(Users, on_delete=models.CASCADE)
    active = models.BooleanField()

    def __str__(self) -> str:
        return f"{self.text}"
