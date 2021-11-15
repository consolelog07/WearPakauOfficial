from django.core.validators import validate_email
from rest_framework import serializers
from ..models import Coupons


class Coupons_serailizer(serializers.ModelSerializer):

    class Meta:
        model = Coupons
        # fields = '__all__'
        exclude=["onlyFor","usedBY"]
        depth=4
