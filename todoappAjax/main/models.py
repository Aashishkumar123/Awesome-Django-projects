from datetime import datetime
from django.db import models

# Create your models here.
class List(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
