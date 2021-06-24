from django.db import models


class Comment(models.Model):
    video_id = models.CharField(max_length=100)
    comment = models.CharField(max_length=100)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
