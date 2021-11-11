from django.test import TestCase

from Products.models import Images


class ImageTestCase(TestCase):
    def setUp(self):
        Images.objects.create(name="trial")


    def test_basic_image_creation(self):
        """
      Ensure we can creation a new Image object.
      """
        image = Images.objects.get(name="trial")
        self.assertEqual(image.name, "trial")


    def test_basic_image_Updation(self):
        """
      Ensure we can updation a new Image object.
      """
        image = Images.objects.get(name="trial")
        self.assertEqual(image.name, "trial")
        try:
            image.name ="trial2"
        except Exception as e:
            raise (f"Image deletion exception {e}")
        self.assertEqual(image.name, "trial2")


    def test_basic_image_deletion(self):
        """
      Ensure we can deletion a new Image object.
      """
        image_count=Images.objects.count()
        image = Images.objects.get(name="trial")
        self.assertEqual(image.name, "trial")
        try:
            image.delete()
        except Exception as e:
            raise (f"Image deletion exception {e}")
