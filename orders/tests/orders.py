from django.test import TestCase

from Ordered_User_products.models import Ordered_User_products
from Products.models import Products
from UserApp.models import User
from cart.models import Product_wrapper, Cart, Coupons

from ..models import Order, Address


class OrderTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="cooluser@seven.com", password="heybro", First_name='cool',
                                        Last_name='user')
        self.address = Address.objects.create(user=self.user, First_name="Hello", Last_name="world",
                                              address="vasundra heights",
                                              address_2="opp juinagar station", city="mumbai", State="Maharastra",
                                              pincode=900706, country="india", phone_number=9137474659, default=True)
        self.coupon = Coupons.objects.create(Code="diwali", discount=20, discription='cool', active=True)

        self.order = Order.objects.create(user=self.user, Address=self.address,
                                          cart_order_id=self.user.cart.cart_order_id)

    def test_basic_Order_creation(self):
        """
       Ensure we can Creation a new Order object.
       """
        user = Order.objects.get(user=self.user, Address=self.address)
        self.assertEqual(user.user.id, self.user.id)
        self.assertEqual(user.Address.id, self.address.id)
        self.assertEqual(user.Order_status, "notplaced")
        self.assertEqual(user.payment_method, "None")
        self.assertEqual(user.cart_order_id, self.user.cart.cart_order_id)

    def test_updating_Order_creatizon(self):
        """
       Ensure we can update a new Order object.
       """
        user = Order.objects.get(user=self.user, Address=self.address)
        self.assertEqual(user.user.id, self.user.id)
        self.assertEqual(user.Address.id, self.address.id)

        self.json = '{"width":400,"height":400,"data":"https://qr-code-styling.com","margin":0,"qrOptions":{"typeNumber":"0","mode":"Byte","errorCorrectionLevel":"Q"},"imageOptions":{"hideBackgroundDots":true,"imageSize":0.4,"margin":0},"dotsOptions":{"type":"extra-rounded","color":"#6a1a4c"},"backgroundOptions":{"color":"#ffffff"},"image":"10cc19bd484118dbcd0a7886a38ceddc.png","dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},"cornersSquareOptions":{"type":"extra-rounded","color":"#000000"},"cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"cornersDotOptions":{"type":"","color":"#000000"},"cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}}'
        self.a = Products.objects.create(name="trialProduct", price=300)
        self.pw = Product_wrapper.objects.create(Product=self.a, QrJson=self.json, gift_wrap=True, Quantity=7)
        self.pw2 = Product_wrapper.objects.create(Product=self.a, QrJson=self.json, gift_wrap=True, Quantity=5)

        self.cart = Cart.objects.get(id=self.user.cart.id)
        self.assertEqual(self.cart.id, self.user.cart.id)
        self.cart.products.add(self.pw)
        self.cart.products.add(self.pw2)
        self.cart.save()


        self.assertEqual(self.cart.giftwrap, False)

        uuidlist = []
        for x in self.cart.products.all():
            for y in range(x.Quantity):
                print(y)
                a = Ordered_User_products.objects.create(Product=x.Product)
                uuidlist.append(a.unique_u14)

        for x in uuidlist:
            try:
                a = Ordered_User_products.objects.get(unique_u14=x)
                user.Ordered_products.add(a)

            except Ordered_User_products.DoesNotExist:
                raise Exception("Ordered_User_products does not exist in access")

        self.assertEqual(user.Ordered_products.all().count(), 12)
        # self.assertEqual(user.total, self.a.price * 12)
        # self.assertEqual(user.with_shiphing_charge, (self.a.price * 12) + user.shipingcharge)
        # self.assertEqual(user.after_coupon_applied, (self.a.price * 12) + user.shipingcharge)
        #
        # # 3600
        # # 3670
        # user.coupons = self.coupon
        # user.save()
        # self.assertNotEqual(user.coupons, None)
        # self.assertEqual(user.total, self.a.price * 12)
        # self.assertEqual(user.with_shiphing_charge, (self.a.price * 12) + user.shipingcharge)
        # self.assertEqual(user.after_coupon_applied, user.with_shiphing_charge * (1 - (self.coupon.discount / 100)))
        # # deactivating coupon
        # self.coupon.active = False
        # self.coupon.save()
        # self.assertEqual(self.coupon.active, False)
        # self.assertEqual(user.total, self.a.price * 12)
        # self.assertEqual(user.with_shiphing_charge, (self.a.price * 12) + user.shipingcharge)
        # self.assertNotEqual(user.after_coupon_applied, user.with_shiphing_charge * (1 - (self.coupon.discount / 100)))
        # user.giftwrap = True
        # user.save()
        # self.assertEqual(user.total, self.a.price * 12)
        # self.assertEqual(user.with_shiphing_charge, (self.a.price * 12) + user.shipingcharge + user.giftwrapcharge)
        # self.assertNotEqual(user.after_coupon_applied, user.with_shiphing_charge * (1 - (self.coupon.discount / 100)))


def test_basic_Order_deletion(self):
    """
       Ensure we can Deletion a new Order object.
       """
    # image = User.objects.get(email="cooluser@seven.com")
    user = Order.objects.get(user=self.user, Address=self.address)
    self.assertEqual(user.user.id, self.user.id)
    self.assertEqual(user.Address.id, self.address.id)
    self.assertNotEqual(user.Order_status, "Cancelled")
    try:
        user.delete()
        raise (f"Order deletion exception not raised")
    except Exception as e:
        pass
    self.assertEqual(user.Order_status, "Cancelled")
