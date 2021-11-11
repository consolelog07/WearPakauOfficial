from django.test import TestCase

from Products.models import ImagesSet,Images




class ImageSetTestCase(TestCase):
    def setUp(self):
        ImagesSet.objects.create(Setname="trial")


    def test_basic_image_set_creation(self):
        """
      Ensure we can creation a new Imageset object.
      """
        image = ImagesSet.objects.get(Setname="trial")
        self.assertEqual(image.Setname, "trial")

    def test_basic_image_set_images_addition_Updation(self):
        """
      Ensure we can image_set_images_addition a new Imageset object.
      """

        a=Images.objects.create(name="a")
        a.save()
        b=Images.objects.create(name="a")
        b.save()
        c=Images.objects.create(name="c")
        c.save()
        image = ImagesSet.objects.get(Setname="trial")
        image.Images.add(a,b,c)
        self.assertEqual(image.Images.count(),3)
    #
    def test_basic_image_set_Updation(self):
        """
      Ensure we can updation a new Imageset object.
      """
        image = ImagesSet.objects.get(Setname="trial")
        self.assertEqual(image.Setname, "trial")
        try:
            image.Setname ="trial2"
        except Exception as e:
            raise (f"Image deletion exception {e}")
        self.assertEqual(image.Setname, "trial2")
    #
    #
    def test_basic_image_set_deletion(self):
        """
      Ensure we can deletion a new Imageset object.
      """
        image_count=ImagesSet.objects.count()
        image = ImagesSet.objects.get(Setname="trial")
        self.assertEqual(image.Setname, "trial")
        try:
            image.delete()
        except Exception as e:
            raise (f"Image deletion exception {e}")
