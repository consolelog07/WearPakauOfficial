from rest_framework.routers import DefaultRouter
from .views import CartOperationsViewset, Product_wrapperViewset, Coupon_Viewset

router = DefaultRouter()

router.register(r'Cart', CartOperationsViewset)
router.register(r'Wrapper', Product_wrapperViewset)
router.register(r'Coupons', Coupon_Viewset)
urlpatterns = router.urls
