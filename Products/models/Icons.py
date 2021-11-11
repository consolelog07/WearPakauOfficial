from django.db import models

from .Images import Images as Img


class Icons(models.Model):
    IconName = models.CharField(max_length=300)
    Images=models.OneToOneField(Img,blank=True,null=True,on_delete=models.CASCADE,related_name="default_icon_image")
    disable=models.BooleanField(default=False)

    def __str__(self):
        return self.IconName
