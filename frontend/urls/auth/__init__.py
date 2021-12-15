

from django.contrib.auth.decorators import login_required

from django.urls import path

from ...Views import BaseReactfile
app_name = 'auth'

urlpatterns = [
    path('Createuser/',BaseReactfile.as_view(),name="Signup"),
    path('',login_required(BaseReactfile.as_view()),name="User"),
    path('login/',BaseReactfile.as_view(),name="Login"),
    path('logout/',BaseReactfile.as_view(),name="Logout"),
    path('Changepassword/',login_required(BaseReactfile.as_view()),name="Changepassword"),
    path('password_reset/',BaseReactfile.as_view(),name="reset-password-email-enter-frontend"),
    path('password_reset_conform/',BaseReactfile.as_view(),name="reset-password-confirm-frontend"),
    path('emailverifysent/',BaseReactfile.as_view(),name="emailverifysent"),
    path('emailverifyconform/',BaseReactfile.as_view(),name="emailverifyconform"),
    path('SMSverifysent/',login_required(BaseReactfile.as_view()),name="SMSverifysent"),
    path('SMSverifyconform/',login_required(BaseReactfile.as_view()),name="SMSverifyconform"),
    path('User-list/',BaseReactfile.as_view(),name="User-list-for-superuser"),
    path('UpdateBasicUserDetail/',login_required(BaseReactfile.as_view()),name="UpdateBasicUserDetail"),
    path('DefaultAddress/',login_required(BaseReactfile.as_view()),name="DefaultAddress"),
]
