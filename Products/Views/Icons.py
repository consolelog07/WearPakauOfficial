from rest_framework import viewsets, status
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Icons

from UserApp.Permissions import coreuseronly
from ..serializer import Icon_serailizer


class Icons_viewset(viewsets.ModelViewSet):
    permission_classes = [coreuseronly]
    queryset = Icons.objects.all()
    serializer_class = Icon_serailizer
    filter_backends = [SearchFilter, OrderingFilter]

    filter_fields = ['IconName', 'id']
    search_fields = ['=IconName']
