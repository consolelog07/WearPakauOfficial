from django.test import TestCase

from Products.models import Products
from UserApp.models import User
from cart.models import Product_wrapper,Coupons
from ..models import Ordered_User_products,Restricted_hostname
class Ordered_user_product_wrapperTestCase(TestCase):
    def setUp(self):
        self.user=User.objects.create(email="cooluser@seven.com", password="heybro",First_name='cool',Last_name='user')
        self.a=Products.objects.create(name="trialProduct",price=300)
        self.ooup=Ordered_User_products.objects.create(Product=self.a)
        self.restrict=Restricted_hostname(hostname="www.google.com")


    def test_basic_Ordered_user_product_creation(self):
        """
       Ensure we can Creation a new Ordered_User_products object.
       """
        user = Ordered_User_products.objects.get(unique_u14=self.ooup.unique_u14)
        self.assertEqual(user.Product.id, self.a.id)
        self.assertEqual(user.activated, False)
        self.assertEqual(user.Suspended, False)
        self.assertEqual(user.user, None)



    def test_updating_Ordered_user_product_creation(self):
        """
       Ensure we can update a new Ordered_user_product object.
       """
        user = Ordered_User_products.objects.get(unique_u14=self.ooup.unique_u14)
        self.assertEqual(user.Product.id, self.a.id)
        self.assertEqual(user.activated, False)

        self.assertEqual(user.user, None)
        user.user=self.user
        user.save()
        self.assertEqual(user.user.id, self.user.id)

        self.assertEqual(user.activated, False)
        user.activated=True
        user.save()
        self.assertEqual(user.activated, True)

        self.assertEqual(user.Suspended, False)
        user.Suspended=True
        user.save()
        self.assertEqual(user.Suspended, True)

        self.assertEqual(user.validate_url_hostname(), True)
        self.assertEqual(user.update_navigate_to("www.google2.com"), True)








    # def test_basic_Coupon_deletion(self):
    #     """
    #    Ensure we can Deletion a new Coupon object.
    #    """
    #     # image = User.objects.get(email="cooluser@seven.com")
    #     user = Coupons.objects.get(Code="diwali")
    #     self.assertEqual(user.discount, 20)
    #     self.assertEqual(user.discription, "cool")
    #     try:
    #         user.delete()
    #     except Exception as e:
    #         raise (f"User deletion exception {e}")
