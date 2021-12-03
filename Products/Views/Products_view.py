# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.filters import SearchFilter, OrderingFilter

from ..models import Products


from UserApp.Permissions import coreuseronly
from ..serializer import Product_serailizer


class Product_viewset(viewsets.ModelViewSet):

    permission_classes = [coreuseronly]

    queryset=Products.objects.all().filter(display_to_user=True)
    serializer_class=Product_serailizer
    filter_backends = [
        # DjangoFilterBackend,
        DjangoFilterBackend,
        SearchFilter,OrderingFilter]
    # filter_fields=['discounted_price','category',"discount_display"]
    filter_fields = ['discount_display','category',"id"]
    search_fields = ['$name','=price','=discount_display','$category',"tags"]
    ordering_fields = ['price','discounted_price']

    @action(detail=True, methods=['get'])
    def default_product_image(self, request, *args, **kwargs):
        object = self.get_object()
        return Response({"success":f"{object.default.image.url}"})
