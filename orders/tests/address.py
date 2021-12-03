from django.test import TestCase
from Products.models import Products
from UserApp.models import User

from ..models import Address
class AddressTestCase(TestCase):
    def setUp(self):
        self.user=User.objects.create(email="cooluser@seven.com", password="heybro",First_name='cool',Last_name='user')
        self.address=Address.objects.create(user=self.user,First_name="Hello",Last_name="world",address="vasundra heights",
        address_2="opp juinagar station",city="mumbai",State="Maharastra",pincode=900706,country="india",phone_number=9137474659,default=True)

    def test_basic_Address_creation(self):
        """
       Ensure we can Creation a new Address object.
       """
        user = Address.objects.get(user=self.user)
        self.assertEqual(user.id, self.address.id)
        self.assertEqual(user.First_name, "Hello")
        self.assertEqual(user.Last_name, "world")
        self.assertEqual(user.country, "india")



    def test_updating_Address_creation(self):
        """
       Ensure we can update a new Address object.
       """
        user = Address.objects.get(user=self.user)
        self.assertEqual(user.id, self.address.id)
        self.assertEqual(user.First_name, "Hello")
        user.First_name="UNa"
        user.save()
        self.assertEqual(user.First_name, "UNa")






    def test_basic_Address_deletion(self):
            """
           Ensure we can Deletion a new Address object.
           """
            # image = User.objects.get(email="cooluser@seven.com")
            user = Address.objects.get(user=self.user)
            self.assertEqual(user.id, self.address.id)
            try:
                user.delete()
            except Exception as e:
                raise (f"Address deletion exception {e}")
