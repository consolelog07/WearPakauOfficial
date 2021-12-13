import uuid

from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.
from django.urls import reverse

from Ordered_User_products.extrafunctions import validator_hostname
from UserApp.models import User
from Products.models import Products
import json

from WearPakauOfficial.settings import Default_QrJson

default_qr_json=Default_QrJson


class Ordered_User_products(models.Model):

    user = models.ForeignKey(User, models.CASCADE, blank=True,null=True)  # owner of product

    Product = models.ForeignKey(Products, models.CASCADE,null=True)
    QrJson = models.TextField(default=default_qr_json)
    size=models.TextField(default="",blank=True,null=True)

    price = models.FloatField(default=0.0)

    unique_u14 = models.UUIDField(unique=True,default=uuid.uuid4)

    created_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True,null=True)


    activated = models.BooleanField(default=False)

    activationCode = models.CharField(max_length=15,blank=True,null=True)

    navigate_to = models.URLField(default="https://www.djangoproject.com/",blank=True,null=True,validators=[validator_hostname])
    Suspended = models.BooleanField(default=False)

    delete_order=models.BooleanField(default=False,help_text="true if product is deleted or user has cancaled order")

    @property
    def Oup_url(self):
        return reverse('oup_product_url', kwargs={'unique_u14':self.unique_u14})

    def __str__(self):
        return f'{self.unique_u14}'

    def delete_product(self):
        self.delete_order=True
        self.Suspended=True
        self.save()

    @property
    def orderedByuser(self):
        a=self.order_set.all()
        print(a)
        if a.count() == 1:
            return a[0].user.email
        else:
            return None
    @property
    def orderedBID(self):
        a=self.order_set.all()
        print(a)
        if a.count() == 1:
            return a[0].OrderId
        else:
            return None

    def validate_url_hostname(self):
        try:
            if validator_hostname(self.navigate_to):
                return True
        except ValidationError as e:
            return False


    def update_navigate_to(self,url):
        try:
            if validator_hostname(url):
                self.navigate_to=url
                return True
        except ValidationError as e:
            return False


