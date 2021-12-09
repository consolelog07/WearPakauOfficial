
from rest_framework.routers import DefaultRouter

from .views import Address_Viewset,Payment_Viewset ,Order_Viewset ,AdminOrder_Viewset

router = DefaultRouter()

router.register(r'Address', Address_Viewset)
router.register(r'Payment', Payment_Viewset)
router.register(r'Orders', Order_Viewset)
router.register(r'AdminOrders', AdminOrder_Viewset)


urlpatterns = router.urls