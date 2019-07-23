from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    content = models.CharField(max_length = 1000)
    username = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

"""class LocationLog(models.Model):
    Long
    lat
	username = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
"""
