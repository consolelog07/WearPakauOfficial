from django.http import HttpResponseRedirect
from django.urls import path, reverse
from Products.models import Products
from ...Views import BaseReactfile
from django.views.generic import TemplateView
app_name = 'product'


class ProductBaseReactfile(BaseReactfile,TemplateView):
    template_name = "index.html"
    def get(self, request,year=None, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        try:
            Product=Products.objects.get(pk=year)

        except Products.DoesNotExist:
            return HttpResponseRedirect(reverse('404_page'))

        return super().get(request,context, *args, **kwargs)

urlpatterns = [
    path('<int:year>/',ProductBaseReactfile.as_view(),name="ProductDetail"),
    path('list/',BaseReactfile.as_view(),name="ProductList"),
]
