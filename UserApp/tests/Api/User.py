from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from UserApp.models import User


class UserApiTests(APITestCase):
    def setUp(self):
        url = reverse('user1-list')
        print(url)
        data = {
            "email": "nimishboda7@gmail.com",
            "password": "Helloworld123",
            "re_password": "Helloworld123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_Api_createUser_account(self):
        """
        Ensure we can create a new User object.
        """
        self.assertEqual(User.objects.count(), 1)

