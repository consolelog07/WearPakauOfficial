from functools import wraps
from django.http import HttpResponseRedirect
from django.urls import reverse


def logged_out_only(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):

        if not request.user.is_authenticated:
            return function(request, *args, **kwargs)
        else:
            return HttpResponseRedirect(reverse("User"))

    return wrap
