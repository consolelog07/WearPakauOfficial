from django.urls import include
from rest_framework.routers import DefaultRouter

from Products.Views import Product_viewset, Image_viewset, ImageSet_viewset, Icons_viewset

router = DefaultRouter()
router.register(r'Products', Product_viewset)
router.register(r'Images', Image_viewset)
router.register(r'ImagesSet', ImageSet_viewset)
router.register(r'Icons', Icons_viewset)
urlpatterns = router.urls
