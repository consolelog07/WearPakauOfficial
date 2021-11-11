from django.db import models
# from django.urls import reverse
from rest_framework.reverse import reverse


class Images(models.Model):
    name = models.CharField(max_length=300)
    image = models.ImageField(upload_to='Productimages')

    def __str__(self):
        return self.name
