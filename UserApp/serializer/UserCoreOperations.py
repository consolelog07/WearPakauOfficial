from django.core.validators import validate_email
from rest_framework import serializers
from UserApp.models import User

class UserserializerCoreOperations(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','email','password','re_password','email_token_dateTime_expire','is_active','is_staff','is_coreTeam']
        read_only_fields = ['First_name','email_token_dateTime_expire','email_token','is_active','is_staff','is_coreTeam']
        ordering = ['-id']



