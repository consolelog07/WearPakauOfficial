from django.core.validators import validate_email
from rest_framework import serializers
from ..models import ImagesSet ,Images


class ImageSet_serailizer(serializers.ModelSerializer):
    Images_pk=serializers.PrimaryKeyRelatedField(queryset=Images.objects.all(),many=True,source='Images',write_only=True)


    class Meta:
        model = ImagesSet
        fields = '__all__'
        depth = 6
