from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from UserApp.Permissions import Owneronly, coreuseronly
from cart.models import Coupons
from ..Serailizer import Coupons_serailizer




class Coupon_Viewset(viewsets.ModelViewSet):
    queryset = Coupons.objects.all()
    serializer_class = Coupons_serailizer
    permission_classes = [IsAuthenticated, coreuseronly]



