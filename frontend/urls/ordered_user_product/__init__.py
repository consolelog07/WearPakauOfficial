from django.contrib import admin

from django.contrib.auth.decorators import login_required

from django.urls import path,include

from .views  import UserTestBasicView,UserTestSuspendedBasicView,UserTesthostnameBasicView
from ...Views import BaseReactfile

app_name = 'Ordered_User_products'
urlpatterns = [
    path('<uuid:unique_u14>',UserTestBasicView.as_view(),name="oup_product_url"),
    # suspende
    path('custom700suspended/<uuid:unique_u14>',UserTestSuspendedBasicView.as_view(),name="custom700suspended"),
    # hostname no allowed
    path('custom701hostnamenotallowed/<uuid:unique_u14>',UserTesthostnameBasicView.as_view(),name="custom701suspended"),

    path('activate/',login_required(BaseReactfile.as_view()),name="ProductList"),
    path('Detail_retrive/',login_required(BaseReactfile.as_view()),name="ProductList"),
]
