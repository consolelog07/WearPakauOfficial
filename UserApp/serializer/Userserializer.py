from django.core.validators import validate_email
from rest_framework import serializers
from UserApp.models import User


class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        read_only_fields = ['last_login',
                            'url',
                            "email",
                            "phone_number",
                            'phone_number_verify',
                            "is_active",
                            ]
        exclude = ['user_permissions',
                   'groups',
                   'password',
                   're_password',
                   # 'is_active',
                   'is_staff',
                   # 'is_coreTeam',
                   'is_superuser',
                   'email_token',
                   'email_token_dateTime_expire',
                   'is_developer',
                   # 'phone_number_verify',
                   "is_suspended",
                   "SMS_token_dateTime_expire",
                   "image",
                   "SMS_token",
                   # "phone_number"
                   ]
