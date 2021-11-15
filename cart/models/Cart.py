from django.utils import timezone

from django.db import models

from ..models.Product_wrapper import Product_wrapper
from UserApp.models import User
from .Coupons import Coupons

from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver




def check_if_coupon_applicable(coupons,user,inner=False):
    if coupons.active and coupons.Activates_on <= timezone.now() and \
            (coupons.activate_forever or coupons.Deactivation > timezone.now()):
        if coupons.for_all:

            try:
                coupons.usedBY.get(id=user.id)
                if inner:
                    return False
                raise("Failed to apply coupon user alreadyused")
            except User.DoesNotExist:
                pass
            return True
        else:
            try:
                coupons.onlyFor.get(id=user.id)

            except User.DoesNotExist:
                if inner:
                    return False
                raise("Failed to apply coupon user not allowed")

            try:
                coupons.usedBY.get(id=user.id)
                if inner:
                    return False
                raise("Failed to apply coupon user alreadyused")
            except User.DoesNotExist:
                pass
            return True


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
    products = models.ManyToManyField(Product_wrapper, blank=True)
    coupons = models.ForeignKey(Coupons, on_delete=models.CASCADE, blank=True, null=True)
    # giftwrap=models.BooleanField(default=False)

    @property
    def total(self):
        Total = 0.0
        for x in self.products.all():
            quantity=x.Quantity if x.Quantity>0 else 1
            if x.Product.discount_display:
                Total = Total + (x.Product.discounted_price*quantity)
                # print(x, x.Product, x.Product.discounted_price, x.Product.discount_display)
            else:
                Total = Total + (x.Product.price*quantity)
                # print(x, x.Product, x.Product.price)
        print(self.coupons)
        return Total

    @property
    def gift_wrap_charge(self):
        Total = 0.0
        for x in self.products.all():
            quantity=x.Quantity if x.Quantity>0 else 1
            if x.gift_wrap:
                Total = Total + (self.giftwrapcharge*quantity)
        print(self.coupons)
        return Total

    @property
    def giftwrapcharge(self):
        if self.total == 0:
            return 0
        return 70

    @property
    def shipingcharge(self):
        if self.total == 0:
            return 0
        return 70
    @property
    def with_shiphing_charge(self):
        shipingcharge=self.shipingcharge
        return shipingcharge+self.total
    @property
    def after_coupon_applied(self):
        Total=self.with_shiphing_charge
        if self.coupons != None and self.coupons.active == True :
            Total = Total * (1 - (self.coupons.discount / 100))
        return Total


    def __str__(self):
        print(self.products.all())
        return self.user.email




@receiver(post_save, sender=User)
def my_handler(sender, instance, **kwargs):
    print(sender, instance, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')

    try:
        if Cart.objects.get(user_id=instance.id):
            return True
    except Cart.DoesNotExist:
        pass

    try:
        Cart.objects.create(user=instance)
    except Exception as e:
        print(e)

