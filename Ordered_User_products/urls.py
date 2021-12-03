from rest_framework.routers import DefaultRouter
from .views import Ordered_User_products_Viewset

router = DefaultRouter()
router.register("Ordered_User_products",Ordered_User_products_Viewset)
urlpatterns = router.urls