from django.core.validators import validate_email
from rest_framework import serializers
from ..models import Products, ImagesSet, Images
from rest_framework.validators import UniqueValidator
from .ImageSet import ImageSet_serailizer


class Product_serailizer(serializers.ModelSerializer):
    ImagesSet_Pk=serializers.PrimaryKeyRelatedField(queryset=ImagesSet.objects.all(),source='ImagesSet',write_only=True)
    Default_Images_Pk=serializers.PrimaryKeyRelatedField(queryset=Images.objects.all(),source='default',write_only=True)

    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        if data['discounted_price'] > data['price']:
            raise serializers.ValidationError("discounted_price greater than price")
        return data

    class Meta:
        model = Products
        fields = '__all__'
        depth = 5
