from django.db import models


class Reply(models.Model):
    comment_id = models.IntegerField()
    message = models.CharField(max_length=100)

