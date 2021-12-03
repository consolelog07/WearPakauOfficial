from django.test import TestCase

from ..models import Restricted_hostname


class Restricted_hostname_TestCase(TestCase):
    def setUp(self):
        self.restrict = Restricted_hostname.objects.create(hostname="www.google.com")

    def test_basic_Restricted_hostname_creation(self):
        """
       Ensure we can Creation a new Restricted_hostname object.
       """
        user = Restricted_hostname.objects.get(hostname="www.google.com")
        self.assertEqual(user.id, self.restrict.id)

    def test_updating_Restricted_hostname_creation(self):
        """
       Ensure we can update a new Restricted_hostname object.
       """
        user = Restricted_hostname.objects.get(hostname="www.google.com")
        self.assertEqual(user.id, self.restrict.id)
        user.hostname = "www.cheeze.com"
        user.save()
        self.assertEqual(user.hostname, "www.cheeze.com")

    def test_basic_Restricted_hostname_deletion(self):
        """
       Ensure we can Deletion a new Coupon object.
       """
        user = Restricted_hostname.objects.get(hostname="www.google.com")
        self.assertEqual(user.id, self.restrict.id)
        user.hostname = "www.cheeze.com"
        user.delete()
