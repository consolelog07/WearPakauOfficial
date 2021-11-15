from django.test import TestCase

from Products.models import Products
from UserApp.models import User
from cart.models import Product_wrapper

class Product_wrapperTestCase(TestCase):
    def setUp(self):
        self.json='{"width":400,"height":400,"data":"https://qr-code-styling.com","margin":0,"qrOptions":{"typeNumber":"0","mode":"Byte","errorCorrectionLevel":"Q"},"imageOptions":{"hideBackgroundDots":true,"imageSize":0.4,"margin":0},"dotsOptions":{"type":"extra-rounded","color":"#6a1a4c"},"backgroundOptions":{"color":"#ffffff"},"image":"10cc19bd484118dbcd0a7886a38ceddc.png","dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},"cornersSquareOptions":{"type":"extra-rounded","color":"#000000"},"cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"cornersDotOptions":{"type":"","color":"#000000"},"cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}}'

        self.a=Products.objects.create(name="trialProduct")
        Product_wrapper.objects.create(Product=self.a,QrJson=self.json,gift_wrap=True,Quantity=23)

    def test_basic_Product_wrapper_creation(self):
        """
       Ensure we can Creation a new Product_wrapper object.
       """
        user = Product_wrapper.objects.get(Product=self.a)
        self.assertEqual(user.QrJson, self.json)
        self.assertEqual(user.Quantity, 23)
        self.assertEqual(user.gift_wrap, True)


    def test_updating_Product_wrapper_creation(self):
        """
       Ensure we can Updating a new Product_wrapper object.
       """
        user = Product_wrapper.objects.get(Product=self.a)
        self.assertEqual(user.QrJson, self.json)
        self.assertEqual(user.Quantity, 23)
        self.assertEqual(user.gift_wrap, True)
        user.Quantity=2
        user.gift_wrap=False
        user.save()
        self.assertEqual(user.Quantity, 2)
        self.assertEqual(user.gift_wrap, False)


    def test_basic_Product_wrapper_deletion(self):
        """
       Ensure we can Deletion a new Product_wrapper object.
       """
        user = Product_wrapper.objects.get(Product=self.a)
        self.assertEqual(user.QrJson, self.json)
        try:
            user.delete()
        except Exception as e:
            raise (f"User deletion exception {e}")
