from django.db import models

# Create your models here.
class Tp(models.Model):
    name = models.CharField(max_length=50)
    company = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
