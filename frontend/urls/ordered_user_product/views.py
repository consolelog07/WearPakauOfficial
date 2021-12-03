from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.generic import TemplateView

from Ordered_User_products.models import Ordered_User_products


class UserTestBasicView(TemplateView):
    template_name = "index.html"

    def test1(self, object):
        return object.Suspended == False

    def test2(self, object):
        return object.validate_url_hostname()

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        try:
            pObject = Ordered_User_products.objects.filter(unique_u14=context["unique_u14"])
            if pObject.count() > 1:
                return HttpResponseRedirect(reverse('404_page'))
            pObject = pObject[0]
        except Ordered_User_products.DoesNotExist:
            # return 404
            return HttpResponseRedirect(reverse('404_page'))

        if self.test1(pObject) and self.test2(pObject):

            context = self.get_context_data(**kwargs)
            context["message"] = pObject.navigate_to
            return self.render_to_response(context)
            # return HttpResponseRedirect(pObject.navigate_to)
        else:
            if not self.test1(pObject):
                # custom 700 not allowed
                return HttpResponseRedirect(reverse('custom700suspended', kwargs={'unique_u14': pObject.unique_u14}))

            if not self.test2(pObject):
                # custom 700 not allowed
                return HttpResponseRedirect(reverse('custom700suspended', kwargs={'unique_u14': pObject.unique_u14}))


class UserTestSuspendedBasicView(TemplateView):
    template_name = "index.html"

    def test1(self, object):
        return object.Suspended == False

    def test2(self, object):
        return object.validate_url_hostname()

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        try:
            pObject = Ordered_User_products.objects.filter(unique_u14=context["unique_u14"])
            if pObject.count() > 1:
                return HttpResponseRedirect(reverse('404_page'))
            pObject = pObject[0]
        except Ordered_User_products.DoesNotExist:
            # return 404
            return HttpResponseRedirect(reverse('404_page'))

        if self.test1(pObject) and self.test2(pObject):

            return HttpResponseRedirect(reverse('oup_product_url', kwargs={'unique_u14': pObject.unique_u14}))
        else:
            if not self.test1(pObject):
                context = self.get_context_data(**kwargs)
                context["message"] = pObject.navigate_to
                return self.render_to_response(context)

            if not self.test2(pObject):
                return HttpResponseRedirect(reverse('custom701suspended', kwargs={'unique_u14': pObject.unique_u14}))


class UserTesthostnameBasicView(TemplateView):
    template_name = "index.html"

    def test1(self, object):
        return object.Suspended == False

    def test2(self, object):
        return object.validate_url_hostname()

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        try:
            pObject = Ordered_User_products.objects.filter(unique_u14=context["unique_u14"])
            if pObject.count() > 1:
                return HttpResponseRedirect(reverse('404_page'))
            pObject = pObject[0]
        except Ordered_User_products.DoesNotExist:
            # return 404
            return HttpResponseRedirect(reverse('404_page'))

        if self.test1(pObject) and self.test2(pObject):

            return HttpResponseRedirect(reverse('oup_product_url', kwargs={'unique_u14': pObject.unique_u14}))
        else:
            if not self.test1(pObject):
                return HttpResponseRedirect(reverse('custom700suspended', kwargs={'unique_u14': pObject.unique_u14}))

            if not self.test2(pObject):
                context = self.get_context_data(**kwargs)
                context["message"] = pObject.navigate_to
                return self.render_to_response(context)
