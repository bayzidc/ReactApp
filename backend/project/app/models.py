from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    content = models.CharField(max_length = 1000)
    created_on = models.DateTimeField(auto_now_add=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class LocationLog(models.Model):
    lng = models.DecimalField(max_digits=9,decimal_places=6)
    lat = models.DecimalField(max_digits=9,decimal_places=6)
    created_on = models.DateTimeField(auto_now_add=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

