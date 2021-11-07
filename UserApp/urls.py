from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserViewset ,UserCoreOperationsViewset
from django.contrib.auth.views import PasswordResetView



router = DefaultRouter()

router.register(r'User', UserViewset)
router.register(r'CUser', UserCoreOperationsViewset, basename='user1')
urlpatterns = router.urls
