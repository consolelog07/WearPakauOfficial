from django.db import models
from django.utils.crypto import get_random_string

# Create your models here.
from Ordered_User_products.models import Ordered_User_products
from UserApp.models import User
from WearPakauOfficial.settings import Default_giftwrapcharge, Default_Shipingcharge
from cart.models import Coupons
from .Address import Address
from .Payment import Payment


def generateOrderId():
    a=get_random_string(length=15,allowed_chars='123456789')

    try:
        Order.objects.get(OrderId=a)
    except Order.DoesNotExist as e:
        return a
    # log here once

    return get_random_string()

Payment_method = (
    ("None","None"),
    ("cod", "cod"),
    ("razorpay", "razorpay")
)

order_status=(
    ("UserCancle","UserCancle"),

    ("notplaced","notplaced"),
    ("placed","placed"),
    ("Processing","Processing"),
    ("Shipped", "Shipped"),
    ("Out For Delivery", "Out For Delivery"),
    ("Delivered", "Delivered"),
    ("Cancelled", "Cancelled"),



    ("cod", "cod"),
    ("RTO Initiated", "RTO Initiated"),
    ("RTO Delivered", "RTO Delivered"),
    ("Pickup Error", "Pickup Error"),

)


class Order(models.Model):
    OrderId = models.CharField(max_length=15, unique=True, default=generateOrderId)

    Ordered_products = models.ManyToManyField(Ordered_User_products, blank=True)

    Address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    Payment = models.ForeignKey(Payment, on_delete=models.CASCADE, blank=True, null=True)

    coupons = models.ForeignKey(Coupons, on_delete=models.CASCADE, blank=True, null=True)

    payment_method = models.CharField(max_length=10, choices=Payment_method,default="None")

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    Order_status = models.CharField(max_length=20, choices=order_status,default="notplaced")

    order_placedon= models.DateTimeField( blank=True, null=True)

    order_status_on_wp_server=models.BooleanField(default=True,help_text="check box if user cancels order after placed")

    cart_order_id=models.CharField(max_length=20,blank=False,null=False)

    giftwrap=models.BooleanField(default=False)

    giftwrapcharge=models.FloatField(default=Default_giftwrapcharge)

    shipingcharge=models.FloatField(default=Default_Shipingcharge)



    reason=models.TextField(default="")

    @property
    def total(self):
        Total = 0.0
        for x in self.Ordered_products.all():
            Total = Total + (x.price)
            # if x.Product.discount_display:
            #     Total = Total + (x.Product.discounted_price * quantity)
                # print(x, x.Product, x.Product.discounted_price, x.Product.discount_display)
            # else:
            #     Total = Total + (x.Product.price * quantity)
                # print(x, x.Product, x.Product.price)
        # print(self.coupons)
        return Total


    @property
    def with_shiphing_charge(self):
        shipingcharge=self.shipingcharge
        if self.giftwrap == True:
            return shipingcharge+self.total+self.giftwrapcharge
        else:
            return shipingcharge+self.total

    @property
    def after_coupon_applied(self):
        Total=self.with_shiphing_charge
        if self.coupons != None and self.coupons.active == True :
            Total = Total * (1 - (self.coupons.discount / 100))
        return Total


    def __str__(self):
        return f"{self.OrderId}  {self.user.email}"

    def delete(self, using=None, keep_parents=False):
        self.Order_status="Cancelled"
        self.save()
        raise Exception("order cant be deleted just set order status to cancel")