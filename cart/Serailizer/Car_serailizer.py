from django.core.validators import validate_email
from rest_framework import serializers

from ..models import Cart, Coupons, Product_wrapper


class Cart_serailizer(serializers.ModelSerializer):
    total_ = serializers.ReadOnlyField(source="total")
    shipingcharge_ = serializers.ReadOnlyField(source="shipingcharge")
    with_shiphing_charge_ = serializers.ReadOnlyField(source="with_shiphing_charge")
    after_coupon_applied_ = serializers.ReadOnlyField(source="after_coupon_applied")
    user_id = serializers.ReadOnlyField(source='user.id')
    products_list_ = serializers.PrimaryKeyRelatedField(queryset=Product_wrapper.objects.all(), many=True
                                                        , source='products', write_only=True)
    coupons = serializers.PrimaryKeyRelatedField(queryset=Coupons.objects.all())
    coupon_name = serializers.PrimaryKeyRelatedField(read_only=True,source="coupons.Code")

    class Meta:
        model = Cart
        # fields = '__all__'
        exclude = ['user']

        depth = 8
