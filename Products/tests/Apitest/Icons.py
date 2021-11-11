from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from Products.models import QrPattern as Products


class ProductsApiTests(APITestCase):

    def test_Api_createProduct_account(self):
        """
        Ensure we can create a new Product object.
        """
        url = reverse('products-list')
        print(url)
        data = {
            "ImagesSet_Pk": 1,
            "Default_Images_Pk": 1,
            "name": "nimish",
            "price": "30",
            "discounted_price": 0.0,
            "discount_display": False,
            "category": "",
            "disable": False,
            "sizes": ""
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Products.objects.count(), 1)
        self.assertEqual(Products.objects.get().name, 'DabApps')