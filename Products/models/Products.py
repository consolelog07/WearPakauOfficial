from django.core.exceptions import ValidationError
from django.db import models
from django.urls import reverse
from .Images import Images
from .imageSet import ImagesSet


class Products(models.Model):
    name = models.TextField(blank=False)
    price = models.FloatField(default=0.0)
    discounted_price = models.FloatField(default=0.0)
    default = models.ForeignKey(Images, blank=True, on_delete=models.CASCADE, null=True)
    discount_display = models.BooleanField(default=False)
    category = models.CharField(max_length=225)
    ImagesSet = models.ForeignKey(ImagesSet, blank=True, on_delete=models.CASCADE, null=True)
    disable = models.BooleanField(default=False,help_text="ckeck if out of stock")
    productDescription=models.TextField(default="",blank=True ,null=True)
    tags=models.TextField(default="",blank=True,null=True)
    sizes=models.TextField(default="",blank=True,null=True)
    created_on=models.TimeField(auto_now_add=True,null=True,blank=True)
    display_to_user=models.BooleanField(default=True,help_text="if u want to delete this product  uncheck this")

    def __str__(self):
        return self.name
