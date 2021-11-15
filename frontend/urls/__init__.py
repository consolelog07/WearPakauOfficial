
from django.urls import path,include
from .auth import urlpatterns as authurlpatterns
from .errors import urlpatterns as errorurlpattern
from .products import urlpatterns as producturlpattern
from .cart import  urlpatterns as carturlpattern
from .errors import error_500 ,error_400s
from ..Views import BaseReactfile
from django.shortcuts import reverse

urlpatterns = [
    path('',BaseReactfile.as_view(),name="Landing"),
    path('auth/',include(authurlpatterns),name="authurlpatterns"),
    path('product/',include(producturlpattern),name="producturlpattern"),
    path('cart/',include(carturlpattern),name="carturlpattern"),
    path('error/',include(errorurlpattern),name="errorurlpatterns")
]

handler403=error_400s
handler404=error_400s
handler400=error_400s
handler500=error_500