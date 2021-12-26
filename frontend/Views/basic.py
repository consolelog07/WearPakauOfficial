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

    def get(self, request, context=None, *args, **kwargs):
        if context == None:
            context = self.get_context_data(**kwargs)
        print(context,"ddddddd")


        a=PhoneNubercheck(request)
        if a == False :
            return self.render_to_response(context)
        elif a != True:
            return a

        a=AddressCheckModified(request)
        if a == False :
            return self.render_to_response(context)
        elif a != True:
            return a

        a=BasicDetailCheck(request)
        if a == False :
            return self.render_to_response(context)
        elif a != True:
            return a


        return self.render_to_response(context)


def AddressCheck(context, request):
    address = ""
    if request.user.is_authenticated == False:
        address = "True"
    else:
        try:
            x = Address.objects.get(user=request.user, default=True)
            address = "True"
        except Address.DoesNotExist:
            address = "False"
        context["addressSet"] = address
def AddressCheckModified(request):
    address = ""
    if request.user.is_authenticated == True:
        try:
            x = Address.objects.get(user=request.user, default=True)
            return False
        except Address.DoesNotExist:
            if request.path != reverse("DefaultAddress"):
                return HttpResponseRedirect(reverse("DefaultAddress"))
            else:
                return False

    return True

def BasicDetailCheck(request):
    if request.user.is_authenticated:
        print(request.user.First_name == "" and request.user.Last_name == "",request.user.First_name,request.user.Last_name,request.user.First_name is None and request.user.Last_name is None,request.user.First_name is None, request.user.Last_name is None )
        if (request.user.First_name == "" and request.user.Last_name == "") or (
                request.user.First_name is None and request.user.Last_name is None):
            print("false.dddddd",request.path)
            if request.path != reverse("UpdateBasicUserDetail"):
                return HttpResponseRedirect(reverse("UpdateBasicUserDetail"))
            else:
                return False
    return True
    print("false")



def PhoneNubercheck(request):
    if request.user.is_authenticated:
        if request.user.phone_number_verify == False:
            print("false.ddddddxxx",request.path,request.path == reverse("SMSverifysent") or request.path== reverse("SMSverifyconform"))
            if request.path == reverse("SMSverifysent") or request.path== reverse("SMSverifyconform"):
                return False
            else:
                return HttpResponseRedirect(reverse("SMSverifysent"))
    return True
