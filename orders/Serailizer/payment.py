from rest_framework import serializers
from UserApp.models import User
from ..models.Payment import Payment


class Payment_serializers(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Payment
        fields = '__all__'
        depth = 8
        read_only_fields =["razorpay_OrderId",
                           "razorpay_payment_id",
                           "razorpay_signature",
                           "razorpay_payment_succestime",
                           "razorpay_payment_refundtime",
                           "created_at",
                           "updated_at",
                           "razorpay_OrderId_status",
                           "razorpay_payment_id_status"]
