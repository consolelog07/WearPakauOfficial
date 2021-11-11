from django.urls import path, include
from rest_framework.routers import DefaultRouter

from Api.views import GetCSRFToken, Check_Authenticated
# from Products.Views import Product_viewset ,Image_viewset


urlpatterns = [
                path('User/', include('UserApp.urls')),
                path('csrf_cookie', GetCSRFToken.as_view()),
                path('Check_Authenticated', Check_Authenticated.as_view()),
                path('Products/', include('Products.urls')),
                # path('Cart/', include('cart.urls')),
                path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
                path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
            ]


