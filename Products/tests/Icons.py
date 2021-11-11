from django.test import TestCase

from Products.models import Icons as Images


class IconsTestCase(TestCase):
    def setUp(self):
        Images.objects.create(IconName="trial")


    def test_basic_Icons_creation(self):
        """
      Ensure we can creation a new Icons object.
      """
        image = Images.objects.get(IconName="trial")
        self.assertEqual(image.IconName, "trial")


    def test_basic_Icons_Updation(self):
        """
      Ensure we can updation a new Icons object.
      """
        image = Images.objects.get(IconName="trial")
        self.assertEqual(image.IconName, "trial")
        try:
            image.IconName="trial2"
        except Exception as e:
            raise (f"Image deletion exception {e}")
        self.assertEqual(image.IconName, "trial2")


    def test_basic_Icons_deletion(self):
        """
      Ensure we can deletion a new Icons object.
      """
        image_count=Images.objects.count()
        image = Images.objects.get(IconName="trial")
        self.assertEqual(image.IconName, "trial")
        try:
            image.delete()
        except Exception as e:
            raise (f"Image deletion exception {e}")
