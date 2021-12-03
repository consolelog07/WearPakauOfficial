from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.crypto import get_random_string

from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from phonenumber_field.validators import validate_international_phonenumber

from UserApp.models import User
from phonenumber_field.modelfields import PhoneNumberField




class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    First_name = models.CharField(max_length=225)
    Last_name = models.CharField(max_length=225)
    address = models.TextField()
    address_2 = models.TextField(help_text="locatlity ladmark")
    city = models.CharField(max_length=20)
    State = models.CharField(max_length=20)
    pincode = models.PositiveIntegerField(default=10, validators=[MinValueValidator(99999), MaxValueValidator(999999)])
    country = models.CharField(default="India", max_length=40)
    phone_number = models.CharField(max_length=15,
    null=True, blank=True,validators=[validate_international_phonenumber,
                                                RegexValidator(
                                                    '^[6-9]\d{9}$',
                                                    message='enter indian number'
                                                ),
                                                ])
    # for billing address
    default = models.BooleanField(default=False)

# "billing_customer_name": "Naruto",
# "billing_last_name": "Uzumaki",
# "billing_address": "House 221B, Leaf Village",
# "billing_address_2": "Near Hokage House",
# "billing_city": "New Delhi",
# "billing_pincode": "110002",
# "billing_state": "Delhi",
# "billing_country": "India",
# "billing_email": "naruto@uzumaki.com",
# "billing_phone": "9876543210",
# @receiver(post_save, sender=User)
# def my_handler(sender, instance, **kwargs):
#     print(sender, instance, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
#     try:
#         if Address.objects.get(user_id=instance.id):
#             return True
#     except Address.DoesNotExist:
#         pass
#
#     try:
#         Address.objects.create(user=instance, default=True)
#     except Exception as e:
#         print(e)
