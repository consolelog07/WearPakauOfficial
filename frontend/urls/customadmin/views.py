from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.generic import TemplateView

from frontend.Views.basic import AddressCheck


class BaseReactfile(TemplateView):
    template_name = "index.html"

    def test1(self):
        request=self.request
        return bool(request.user and request.user.is_authenticated and request.user.is_coreTeam)

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)


        if self.test1():
            return super().get(request,context, *args, **kwargs)
        else:
            return HttpResponseRedirect(reverse('400_page'))

