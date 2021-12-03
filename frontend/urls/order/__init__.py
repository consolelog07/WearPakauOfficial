from django.contrib import admin

from django.contrib.auth.decorators import login_required

from django.urls import path,include

from .view import BaseReactfile2, checkiforderexist, checkiforderexist_and_for_errors ,setOrderAddress
from ...Views import BaseReactfile


app_name = 'order'
urlpatterns = [

    # set order payment method here
    path('',login_required(checkiforderexist.as_view()),name="currentorder"),

    path('error_with_products',login_required(checkiforderexist_and_for_errors.as_view()),name="error_with_products"),

    path('setorderaddress',login_required(setOrderAddress.as_view()),name="setorderaddress"),

    # All orders
    path('orderList',login_required(BaseReactfile.as_view()),name="OrderList"),

    # only user can get acces to order
    path('<int:pk>',login_required(BaseReactfile.as_view()),name="OrderDetail"),
]
