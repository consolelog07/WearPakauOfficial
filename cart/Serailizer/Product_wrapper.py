from django.core.validators import validate_email
from rest_framework import serializers

from Products.models import Products, Images, Icons
from ..models import Product_wrapper


class ProductWrapper_serailizer(serializers.ModelSerializer):
    Product_ = serializers.PrimaryKeyRelatedField(queryset=Products.objects.all()
                                                 , source='Product', write_only=True)

    class Meta:
        model = Product_wrapper
        fields = '__all__'
        depth = 4
