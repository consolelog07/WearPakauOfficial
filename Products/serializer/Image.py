from django.core.validators import validate_email
from rest_framework import serializers
from ..models import Images


class Image_serailizer(serializers.ModelSerializer):

    class Meta:
        model = Images
        fields = '__all__'
