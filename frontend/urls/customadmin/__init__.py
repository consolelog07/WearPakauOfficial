from django.contrib.auth.decorators import login_required
from django.urls import path

from .views import BaseReactfile as BR

urlpatterns = [
    path('',login_required(BR.as_view()),name="OrderAdmin"),
    path('<int:year>/',login_required(BR.as_view()),name="OrderAdminDetail"),
]
