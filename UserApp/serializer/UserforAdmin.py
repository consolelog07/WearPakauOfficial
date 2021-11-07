from django.core.validators import validate_email
from rest_framework import serializers
from UserApp.models import User

class UserforAdmin(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['__all__']


