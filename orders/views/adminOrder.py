
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.viewsets import GenericViewSet
from rest_framework.renderers import JSONRenderer
from UserApp.models import User
from orders.Serailizer import Order_serializers
from orders.Serailizer.OrderAdminSerailizer import OrderAdmin_serializers
from orders.models import Order


class Iscoreuser(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_coreTeam)


class AdminOrder_Viewset(mixins.RetrieveModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = Order.objects.all().order_by("-order_placedon")
    serializer_class = OrderAdmin_serializers
    permission_classes = [IsAuthenticated,Iscoreuser]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,OrderingFilter]
    # filter_fields=['discounted_price','category',"discount_display"]
    filter_fields = ['id',"payment_method","Order_status","user_id"]
    search_fields = ["OrderId"]
    ordering_fields = ['order_placedon',]

    # update later
    @action(detail=False, methods=['GET'])
    def Get_stats(self, request, *args, **kwargs):
        a={}
        a["totalorders"]=Order.objects.all().count()
        a["placed"]=Order.objects.filter(Order_status="placed").count()
        a["Processing"]=Order.objects.filter(Order_status="Processing").count()
        a["Shipped"]=Order.objects.filter(Order_status="Shipped").count()
        a["Delivered"]=Order.objects.filter(Order_status="Delivered").count()
        a["Out For Delivery"]=Order.objects.filter(Order_status="Out For Delivery").count()
        a["Cancelled"]=Order.objects.filter(Order_status="Cancelled").count()
        a["Cancelled"]=Order.objects.filter(Order_status="Cancelled").count()
        b=Order.objects.all().values("OrderId")
        c=User.objects.all().values("email","id")
        b=JSONRenderer().render(b)
        c=JSONRenderer().render(c)
        return Response({"Success":a,"orderId":b,"email":c})

    @action(detail=True, methods=['Post'])
    def Process(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            if instance.Order_status == "placed":
                instance.Order_status="Processing"
                instance.save()
                return Response({"Success":"processing"})
            else:
                return Response({"error":"order_status not placed"})
        except Exception as e:
            print(e)
            return Response({"error":e})

    @action(detail=True, methods=['Post'])
    def Shipped(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            if instance.Order_status == "Processing":
                instance.Order_status="Shipped"
                instance.save()
                return Response({"Success":"Shipped"})
            else:
                return Response({"error":"order_status not Processing"})
        except Exception as e:
            print(e)
            return Response({"error":e})

    @action(detail=True, methods=['Post'])
    def Cancellation(self, request, *args, **kwargs):
        instance = self.get_object()
        data=request.data

        try:
            data["reason"]
        except Exception as e:
            return Response({"error":"no  reason"})
        try:
            if instance.Order_status != "Delivered":
                instance.Order_status="Cancelled"
                instance.reason="Cancled By Team wearPakau  "+data["reason"]
                instance.save()

                return Response({"Success":"Cancelled"})
            else:
                return Response({"error":"order_status is Delivered"})
        except Exception as e:
            print(e)
            return Response({"error":e})

