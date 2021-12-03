from django.contrib.auth.mixins import UserPassesTestMixin
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.generic.base import TemplateView
# Create your views here.
from Ordered_User_products.models import Ordered_User_products
from django.urls import reverse


class BaseReactfile(TemplateView):
    template_name = "index.html"

