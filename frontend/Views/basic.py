from django.contrib.auth.mixins import UserPassesTestMixin
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.generic.base import TemplateView
# Create your views here.
from Ordered_User_products.models import Ordered_User_products
from django.urls import reverse

from orders.models import Address


class BaseReactfile(TemplateView):
    template_name = "index.html"
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        AddressCheck(context,request)
        return self.render_to_response(context)




def AddressCheck(context,request):
    address=""
    if request.user.is_authenticated == False:
        address="True"
    else:
        try:
            x = Address.objects.get(user=request.user, default=True)
            address="True"
        except Address.DoesNotExist:
            address="False"
        context["addressSet"]=address