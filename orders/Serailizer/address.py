from rest_framework import serializers
from UserApp.models import User
from ..models import Address


class Address_serializers(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Address
        fields = '__all__'
        depth = 8
        read_only_fields = ['user']
