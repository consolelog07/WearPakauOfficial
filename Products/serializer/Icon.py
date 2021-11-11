from django.core.validators import validate_email
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from ..models import Icons, Images


class Icon_serailizer(serializers.ModelSerializer):
    Images_ = serializers.PrimaryKeyRelatedField(queryset=Images.objects.all(), source='Images', write_only=True)

    class Meta:
        model = Icons
        fields = '__all__'
        depth = 8
