
from django.contrib import admin

from django.contrib.auth.decorators import login_required

from django.urls import path,include

from ...Views import BaseReactfile
app_name = 'product'
urlpatterns = [
    path('<int:year>/',BaseReactfile.as_view(),name="ProductDetail"),
    path('list/',BaseReactfile.as_view(),name="ProductList"),
]
