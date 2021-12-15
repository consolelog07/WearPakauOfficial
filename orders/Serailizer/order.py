from rest_framework import serializers

from orders.models import Order


class Order_serializers(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    address_id=serializers.ReadOnlyField(source='Address.id')
    total_ = serializers.ReadOnlyField(source="total")
    shipingcharge_ = serializers.ReadOnlyField(source="shipingcharge")
    with_shiphing_charge_ = serializers.ReadOnlyField(source="with_shiphing_charge")
    after_coupon_applied_ = serializers.ReadOnlyField(source="after_coupon_applied")
    coupon_name = serializers.PrimaryKeyRelatedField(read_only=True,source="coupons.Code")
    giftwrapcharge_ = serializers.ReadOnlyField(source="giftwrapcharge")


    class Meta:
        model = Order
        exclude = ['user',
                   "Address",
                   "giftwrapcharge",
                   # "giftwrap",
                   "shipingcharge"
                   ]
        depth = 1
        read_only_fields = ['OrderId',"Ordered_products","Address.user","giftwrapcharge"]
