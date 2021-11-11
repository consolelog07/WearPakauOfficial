# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from ..models import ImagesSet

from UserApp.Permissions import coreuseronly
from ..serializer import ImageSet_serailizer


class ImageSet_viewset(viewsets.ModelViewSet):
    permission_classes = [coreuseronly]
    queryset = ImagesSet.objects.all()
    serializer_class = ImageSet_serailizer
    filter_backends = [SearchFilter, OrderingFilter]

    filter_fields = ['name', 'id']
    search_fields = ['=name']
