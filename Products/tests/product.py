from django.test import TestCase

from Products.models import Products


class ProductTestCase(TestCase):
    def setUp(self):
        Products.objects.create(name="trialProduct")

    def test_basic_Product_creation(self):
        """
       Ensure we can create a new Product object.
       """

        user = Products.objects.get(name="trialProduct")
        self.assertEqual(user.name, "trialProduct")


    def test_basic_Product_Updation(self):
        """
       Ensure we can Updation a new Product object.
       """
        image = Products.objects.get(name="trialProduct")
        self.assertEqual(image.name, "trialProduct")
        try:
            image.name ="trial2"
        except Exception as e:
            raise (f"Prodcut deletion exception {e}")
        self.assertEqual(image.name, "trial2")


    def test_basic_Product_deletion(self):
        """
       Ensure we can Deletion a new Product object.
       """
        image = Products.objects.get(name="trialProduct")
        self.assertEqual(image.name, "trialProduct")
        try:
            image.delete()
        except Exception as e:
            raise (f"Image deletion exception {e}")

