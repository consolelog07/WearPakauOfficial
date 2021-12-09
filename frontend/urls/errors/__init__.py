
from django.contrib import admin
from django.http import HttpResponseNotFound
from django.shortcuts import render
from django.urls import path


from frontend.Views import BaseReactfile
from frontend.Views.basic import AddressCheck


def error_400s(request,exception=None):
    context = {}
    AddressCheck(context,request)
    return render(request,'index.html', context)

def error_500(request):
    context = {}
    AddressCheck(context,request)
    return render(request,'index.html', context)

urlpatterns = [
    path('400/',error_400s,name="400_page"),
    path('403/',error_400s,name="403_page"),
    path('404/',error_400s,name="404_page"),
    path('500/',error_500,name="500_page"),
]
