from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from UserApp.custom_functions import list_user,list
from ..models import Address
from ..Serailizer import Address_serializers
# import json



class Address_Viewset(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = Address_serializers
    permission_classes = [IsAuthenticated]

    filter_backends = [
        # DjangoFilterBackend,
        DjangoFilterBackend,
        SearchFilter,OrderingFilter]
    # filter_fields=['discounted_price','category',"discount_display"]
    filter_fields = ['user',"default",'id']
    # search_fields = ['$name','=price','=discount_display','$category',"tags"]
    # ordering_fields = ['price','discounted_price']


    def list(self, request, *args, **kwargs):
        return list_user(self, request, *args, **kwargs)

    def perform_create(self, serializer):
        user = None

        if self.request and hasattr(self.request, "user"):
            user = self.request.user

        try:
            add=Address.objects.filter(user=user,default=True)
            print("sssssssssssssssssssssssssssssssssssssssssssssd")
            if add.count() >= 1:
                print("kkkkkkkkkkksssssssssssssssssssssssssssssssssssssssssssssd")
                return serializer.save(user=user,default=False)
        except Address.DoesNotExist:
            pass

        serializer.save(user=user)

    @action(detail=True, methods=['get'])
    def set_address_default(self,request,pk,*args,**kwargs):
        self.object = self.get_object()
        user = self.request.user
        try:
            add=Address.objects.filter(user=user,default=True)
            for x in add:
                x.default=False
                x.save()
        except Address.DoesNotExist:
            pass
        self.object.default=True
        self.object.save()
        print(args,kwargs,self.object.id)
        return Response({"success":"True"})

    @action(detail=False, methods=['get'])
    def get_address_default(self,request,*args,**kwargs):
        user = self.request.user
        try:
            add=Address.objects.get(user=user,default=True)
        except Address.DoesNotExist:
            return Response({"error":"True"})
        except Address.MultipleObjectsReturned:
            add=Address.objects.filter(user=user,default=True)
            add=add[0]

        serializer = self.get_serializer(add)
        return Response(serializer.data)
