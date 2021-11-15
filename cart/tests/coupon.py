from django.test import TestCase
from UserApp.models import User
from cart.models import Product_wrapper,Coupons

class Coupons_wrapperTestCase(TestCase):
    def setUp(self):
        Coupons.objects.create(Code="diwali",discount=20,discription='cool')

    def test_basic_Coupon_creation(self):
        """
       Ensure we can Creation a new Coupon object.
       """
        user = Coupons.objects.get(Code="diwali")
        self.assertEqual(user.discount, 20)
        self.assertEqual(user.discription, "cool")


    def test_updating_Coupon_creation(self):
        """
       Ensure we can update a new Coupon object.
       """
        user = Coupons.objects.get(Code="diwali")
        self.assertEqual(user.discount, 20)
        self.assertEqual(user.discription, "cool")
        user.discount=50
        user.save()
        self.assertEqual(user.discount, 50)

    def test_basic_Coupon_deletion(self):
        """
       Ensure we can Deletion a new Coupon object.
       """
        # image = User.objects.get(email="cooluser@seven.com")
        user = Coupons.objects.get(Code="diwali")
        self.assertEqual(user.discount, 20)
        self.assertEqual(user.discription, "cool")
        try:
            user.delete()
        except Exception as e:
            raise (f"User deletion exception {e}")
