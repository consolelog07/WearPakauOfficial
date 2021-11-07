from django.core.validators import RegexValidator
from phonenumber_field.validators import validate_international_phonenumber
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
class Phoneserailizer(serializers.Serializer):

    phone_number = serializers.CharField(required=True, validators=[
                                                             validate_international_phonenumber,
                                                             RegexValidator(
                                                                 '^[6-9]\d{9}$',
                                                                 message='enter indian number'
                                                             ),
                                                             ]
                                  )