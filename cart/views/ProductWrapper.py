from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated

from UserApp.Permissions import Owneronly
from cart.models import Product_wrapper
from ..Serailizer import ProductWrapper_serailizer

class Owneronly_wrapper(permissions.BasePermission):
    message = 'Cant view wrapper.'


    def has_object_permission(self, request, view, obj):
        user = request.user

        if request.user.is_anonymous:
            return False
        if obj.cart_set.all()[0].user.id == user.id:
            return True
        if user.is_developer:
            return True



class Product_wrapperViewset(viewsets.ModelViewSet):
    queryset = Product_wrapper.objects.all()
    serializer_class = ProductWrapper_serailizer
    permission_classes = [IsAuthenticated, Owneronly_wrapper]

