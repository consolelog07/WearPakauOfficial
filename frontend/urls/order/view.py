from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.generic import TemplateView

from WearPakauOfficial.settings import razorpay_key_id
from frontend.Views.basic import AddressCheck
from orders.OrderHelperFunctions import check_if_error_with_any_product
from orders.models import Order, Address


class BaseReactfile2(TemplateView):
    template_name = "index.html"
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        AddressCheck(context,request)
        context['key'] = razorpay_key_id
        return self.render_to_response(context)


class checkiforderexist(TemplateView):
    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        AddressCheck(context,request)
        try:
            x = Order.objects.get(user=request.user, cart_order_id=self.request.user.cart.cart_order_id)
        except Order.DoesNotExist:
            return HttpResponseRedirect(reverse('CartIndex'))
        if check_if_error_with_any_product(request.user) != False:
            return HttpResponseRedirect(reverse('error_with_products'))


        if request.user.cart.products.all().count() == 0:
            return HttpResponseRedirect(reverse('CartIndex'))

        context['key'] = razorpay_key_id
        return self.render_to_response(context)


class checkiforderexist_and_for_errors(TemplateView):
    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        try:
            x = Order.objects.get(user=request.user, cart_order_id=self.request.user.cart.cart_order_id)
        except Order.DoesNotExist:
            return HttpResponseRedirect(reverse('CartIndex'))
        if check_if_error_with_any_product(request.user) != False:
            context['error'] = True
        if request.user.cart.products.all().count() == 0:
            return HttpResponseRedirect(reverse('CartIndex'))
        context['key'] = razorpay_key_id
        return super().get(request,context,*args,**kwargs)





class setOrderAddress(TemplateView):
    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)

        try:
            x = Address.objects.get(user=request.user, default=True)
        except Address.DoesNotExist:
            return HttpResponseRedirect(reverse('DefaultAddress'))

        if request.user.cart.products.all().count() == 0:
            return HttpResponseRedirect(reverse('CartIndex'))
        return super().get(request,context,*args,**kwargs)
