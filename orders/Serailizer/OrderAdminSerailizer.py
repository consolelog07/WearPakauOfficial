from rest_framework import serializers

from orders.models import Order


class OrderAdmin_serializers(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    user_email = serializers.ReadOnlyField(source='user.email')
    total_ = serializers.ReadOnlyField(source="total")

    shipingcharge_ = serializers.ReadOnlyField(source="shipingcharge")
    with_shiphing_charge_ = serializers.ReadOnlyField(source="with_shiphing_charge")
    after_coupon_applied_ = serializers.ReadOnlyField(source="after_coupon_applied")

    coupon_name = serializers.PrimaryKeyRelatedField(read_only=True,source="coupons.Code")

    giftwrapcharge_ = serializers.ReadOnlyField(source="giftwrapcharge")
    RazorpayOrderId_=serializers.SerializerMethodField()


    class Meta:
        model = Order
        exclude = [
                    'user',
                   "giftwrapcharge",
                   # "giftwrap",
                   "shipingcharge"
                   ]
        depth = 1
        read_only_fields = ['OrderId',"Ordered_products","Address.user","giftwrapcharge"]
    def get_RazorpayOrderId_(self, obj):
        if obj.payment_method == "razorpay" and obj.Payment != None:
            a=None
            try:
                a=obj.Payment.razorpay_OrderId
                return a
            except Exception as e:
                print(e)

        return None