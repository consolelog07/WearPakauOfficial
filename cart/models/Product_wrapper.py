from django.db import models

from Products.models import Products,Icons,Images
from UserApp.models import User
from WearPakauOfficial.settings import Default_QrJson



default_qr_json=Default_QrJson

class Product_wrapper(models.Model):
    Product = models.ForeignKey(Products, on_delete=models.CASCADE,blank=True)
    QrJson = models.TextField(default=default_qr_json)
    Quantity=models.IntegerField(default=1)
    size=models.TextField(default="",blank=True,null=True)
    gift_wrap=models.BooleanField(default=False)

    def __str__(self):
        return f"{self.Product.id}_"


