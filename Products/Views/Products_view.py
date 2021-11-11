# from django_filters.rest_framework import DjangoFilterBackend
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated ,SAFE_METHODS
from rest_framework.response import Response
from ..models import Products


from UserApp.Permissions import coreuseronly
from ..serializer import Product_serailizer


class Product_viewset(viewsets.ModelViewSet):

    permission_classes = [coreuseronly]

    queryset=Products.objects.all()
    serializer_class=Product_serailizer
    filter_backends = [
        # DjangoFilterBackend,
        DjangoFilterBackend,
        SearchFilter,OrderingFilter]
    # filter_fields=['discounted_price','category',"discount_display"]
    filter_fields = ['discount_display','category',"id"]
    search_fields = ['$name','=price','=discount_display','$category',"tags"]
    ordering_fields = ['price','discounted_price']
