from django.db import models

from .Images import Images


class ImagesSet(models.Model):
    Setname = models.CharField(max_length=300)
    Images = models.ManyToManyField(Images,blank=True)

    def __str__(self):
        return self.Setname
