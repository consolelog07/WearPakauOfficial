from django.contrib import admin
from .models import Address , Payment ,Order
# Register your models here.

class Addressmodeladmin(admin.ModelAdmin):
    list_display = ['user', "address","First_name"]
    search_fields = ['user',"address","State","pincode"]
    list_filter = ["State"]
    readonly_fields = ["default"]

    class Meta:
        model = Address


    def has_delete_permission(self, request, obj=None):
        return False
    def has_change_permission(self, request, obj=None):
        return False
admin.site.register(Address, Addressmodeladmin)




class Ordermodeladmin(admin.ModelAdmin):
    list_display = ['OrderId',"user","payment_method","Payment","order_placedon","order_status_on_wp_server","Order_status"]
    search_fields = ['OrderId',"user",]
    list_filter = ["Order_status"]
    readonly_fields = [
        "OrderId",
        "user",
        "total",
        "giftwrapcharge",
        "with_shiphing_charge",
        "after_coupon_applied",
        "giftwrap",
        "cart_order_id",
        "Address",
        "coupons",
        "created_at",
        "updated_at",
        "payment_method",
        "Payment",
        "Ordered_products",
        "order_placedon"
    ]

    class Meta:
        model = Order
    #
    # def has_delete_permission(self, request, obj=None):
    #     return False
    def has_add_permission(self, request):
        return False

admin.site.register(Order, Ordermodeladmin)




class Paymentmodeladmin(admin.ModelAdmin):
    list_display = ['razorpay_OrderId',"razorpay_payment_succestime","user","Order_id_wp","Payment_completed"]
    search_fields = ['razorpay_OrderId',"razorpay_payment_id"]
    # list_filter = ["Payment_completed"]
    readonly_fields = [
        # "razorpay_OrderId",
                        "Order_id_wp",
                        "Payment_completed",
                        "user",
                        "Total_",
                        "giftwrapcharge",
                        "shipingcharge",
                        "with_shiphing_charge",
                       "razorpay_payment_id",
                       "razorpay_signature",
                       "razorpay_payment_succestime",
                       "razorpay_payment_refundtime",
                       "created_at",
                       "updated_at",
                       "razorpay_OrderId_status",
                       "razorpay_payment_id_status",
            ]

    class Meta:
        model = Payment


    # def has_delete_permission(self, request, obj=None):
    #     return False
    def has_change_permission(self, request, obj=None):
        return False


    # def has_add_permission(self, request):
    #     return False

admin.site.register(Payment, Paymentmodeladmin)
