from django.test import TestCase

from Products.models import Products
from UserApp.models import User
from cart.models import Cart, Product_wrapper, Coupons


class CartTestCase(TestCase):
    def setUp(self):
        User.objects.create(email="cooluser@seven.com", password="heybro",First_name='cool',Last_name='user')
        self.json='{"width":400,"height":400,"data":"https://qr-code-styling.com","margin":0,"qrOptions":{"typeNumber":"0","mode":"Byte","errorCorrectionLevel":"Q"},"imageOptions":{"hideBackgroundDots":true,"imageSize":0.4,"margin":0},"dotsOptions":{"type":"extra-rounded","color":"#6a1a4c"},"backgroundOptions":{"color":"#ffffff"},"image":"10cc19bd484118dbcd0a7886a38ceddc.png","dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},"cornersSquareOptions":{"type":"extra-rounded","color":"#000000"},"cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"cornersDotOptions":{"type":"","color":"#000000"},"cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}}'
        self.a=Products.objects.create(name="trialProduct",price=300)
        self.pw=Product_wrapper.objects.create(Product=self.a,QrJson=self.json,gift_wrap=True,Quantity=23)
        self.pw2=Product_wrapper.objects.create(Product=self.a,QrJson=self.json,gift_wrap=True,Quantity=23)

        self.coupon=Coupons.objects.create(Code="diwali",discount=20,discription='cool',active=True)


    def test_basic_cart_creation(self):
        """
          Ensure we can Creation a new Cart object.
         """
        user = User.objects.get(email="cooluser@seven.com")
        self.assertEqual(user.is_developer, False)
        self.assertEqual(user.is_coreTeam, False)
        self.assertEqual(user.is_superuser, False)
        self.assertEqual(user.is_active, False)
        cart = Cart.objects.get(id=user.cart.id)
        self.assertEqual(cart.id, user.cart.id)
        self.assertEqual(cart.coupons, None)
        self.assertEqual(cart.total, 0)


    def test_updating_Product_wrapper_creation(self):
        """
       Ensure we can Updating a new Product_wrapper  in cart test object.
       """
        user = User.objects.get(email="cooluser@seven.com")
        self.assertEqual(user.is_developer, False)
        cart = Cart.objects.get(id=user.cart.id)
        self.assertEqual(cart.id, user.cart.id)
        # self.pw = Product_wrapper.objects.get(Product=self.a)
        self.assertEqual(self.pw.QrJson, self.json)
        self.assertEqual(self.pw.Quantity, 23)
        # self.assertEqual(self.pw.gift_wrap, True)
        self.pw.Quantity=2
        self.pw.gift_wrap=False
        self.pw.save()
        self.assertEqual(self.pw.Quantity, 2)
        self.assertEqual(self.pw.gift_wrap, False)

    def test_updating_cart_creation(self):
        """
          Ensure we can Updating _cart_creation in car object.
         """
        user = User.objects.get(email="cooluser@seven.com")
        self.assertEqual(user.is_developer, False)
        cart = Cart.objects.get(id=user.cart.id)
        self.assertEqual(cart.id, user.cart.id)
        self.assertEqual(cart.total, 0)
        self.assertEqual(cart.products.all().count(), 0)
        cart.products.add(self.pw)
        cart.save()
        self.assertEqual(cart.products.all().count(), 1)
        self.assertEqual(cart.total,self.a.price*23)
        self.assertEqual(cart.with_shiphing_charge,(self.a.price*23)+cart.shipingcharge)
        self.assertEqual(cart.after_coupon_applied,(self.a.price*23)+cart.shipingcharge)
        cart.products.add(self.pw2)
        cart.save()
        self.assertEqual(cart.products.all().count(), 2)
        self.assertEqual(cart.total,self.a.price*46)
        self.assertEqual(cart.with_shiphing_charge,(self.a.price*46)+cart.shipingcharge)
        self.assertEqual(cart.after_coupon_applied,(self.a.price*46)+cart.shipingcharge)
        self.assertEqual(cart.coupons,None)
        cart.coupons=self.coupon
        cart.save()
        self.assertNotEqual(cart.coupons,None)
        self.assertEqual(cart.total,self.a.price*46)
        self.assertEqual(cart.with_shiphing_charge,(self.a.price*46)+cart.shipingcharge)
        self.assertEqual(cart.after_coupon_applied,(cart.with_shiphing_charge)*(1 - (self.coupon.discount / 100)))
        self.coupon.active=False
        self.coupon.save()
        self.assertEqual(self.coupon.active,False)
        self.assertEqual(cart.total,self.a.price*46)
        self.assertEqual(cart.with_shiphing_charge,(self.a.price*46)+cart.shipingcharge)
        self.assertNotEqual(cart.after_coupon_applied,(cart.with_shiphing_charge)*(1 - (self.coupon.discount / 100)))

    def test_basic_User_deletion(self):
        """
       Ensure we can Deletion in a new Cart object.
       """

        user = User.objects.get(email="cooluser@seven.com")
        self.assertEqual(user.is_developer, False)
        cart = Cart.objects.get(id=user.cart.id)
        self.assertEqual(cart.id, user.cart.id)
        try:
            cart.delete()
        except Exception as e:
            raise (f"User deletion exception {e}")
