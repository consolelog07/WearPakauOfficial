from razorpay import client
from rest_framework import viewsets, permissions, status, mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.viewsets import GenericViewSet

from ..models.Payment import Payment
from ..Serailizer import Payment_serializers


class Payment_Viewset(mixins.RetrieveModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = Payment.objects.all()
    serializer_class = Payment_serializers
    permission_classes = [IsAuthenticated]

