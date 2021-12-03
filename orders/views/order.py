from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django.utils import timezone

from Products.models import Products
from UserApp.custom_functions import list_user, list_user_content_only
from orders.OrderHelperFunctions import cod_possible_check1, cod_possible_check2, createorder, \
    clear_cart_and_update_seesion, check_if_error_with_any_product, delete_products_created, place_order
from orders.Serailizer import Order_serializers
from orders.models import Order, Address, Payment
from url_filter.integrations.drf import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter


address_id_validator=RegexValidator(regex='^[0-9]*$', message="pass order id")
razorpay_payment_id_validator=RegexValidator(regex='^[A-Za-z0-9!@#$&()-`.+,/\"]*$', message="pass razorpay_payment_id id")
razorpay_order_id_validator=RegexValidator(regex='^[A-Za-z0-9!@#$&()-`.+,/\]*$', message="pass razorpay_order_id id")
razorpay_signature_validator=RegexValidator(regex='^[A-Za-z0-9!@#$&()-`.+,/\]*$', message="pass razorpay_signature id")

class Order_Viewset(mixins.RetrieveModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = Order.objects.all().order_by("-order_placedon")
    serializer_class = Order_serializers
    permission_classes = [IsAuthenticated]

    filter_backends = [
        # DjangoFilterBackend,
        DjangoFilterBackend,
        SearchFilter,OrderingFilter]
    # filter_fields=['discounted_price','category',"discount_display"]
    filter_fields = ['id',"payment_method","Order_status"]
    # search_fields = ['$name','=price','=discount_display','$category',"tags"]
    ordering_fields = ['order_placedon','total_']

    # update later
    def list(self, request, *args, **kwargs):
        return list_user_content_only(self, request, *args, **kwargs)

    @action(detail=False, methods=['Post'])
    def CreateOrder(self, request, *args, **kwargs):
        data = request.data

        try:
            address_id = data["address_id"]
        except Exception as e:
            return Response({"error": "addres   s_id not provided"})

        try:
            a = Address.objects.get(id=address_id, user=request.user)
        except Address.DoesNotExist:
            return Response({"error": "address does not exist"})

        # check if order already creted using cartorderid
        for x in request.user.order_set.all():
            if x.cart_order_id == self.request.user.cart.cart_order_id:
                return Response({"Success": "order already created"})

        try:
            x = Order.objects.get(user=request.user, cart_order_id=self.request.user.cart.cart_order_id)
            return Response({"Success": "order already created"})
        except Order.DoesNotExist:
            pass

        Order.objects.create(user=self.request.user, Address=a,
                             cart_order_id=self.request.user.cart.cart_order_id)
        return Response({"Success": "order created successfully"})

    @action(detail=False, methods=['Post'])
    def UpdateAddress(self, request, *args, **kwargs):
        data = request.data

        try:
            address_id = data["address_id"]
            address_id_validator.__call__(address_id)

        except Exception as e:
            return Response({"error": " valid address_id not provided"})

        try:
            a = Address.objects.get(id=address_id, user=request.user)
        except Address.DoesNotExist:
            return Response({"error": "address does not exist"})

        # # check if order already creted using cartorderid
        # for x in request.user.order_set.all():
        #     if x.cart_order_id == self.request.user.cart.cart_order_id:
        #         return Response({"Success": "order already created"})

        try:
            x = Order.objects.get(user=request.user, cart_order_id=self.request.user.cart.cart_order_id)
            # return Response({"Success": "order already created"})
        except Order.DoesNotExist:
            return Response({"error": "order not created yet"})

        x.Address =a
        x.save()

        # Order.objects.create(user=self.request.user, Address=a,
        #                      cart_order_id=self.request.user.cart.cart_order_id)
        return Response({"Success": "Address updated successfully"})

    @action(detail=False, methods=['get'])
    def get_current_order(self, request, *args, **kwargs):

        try:
            x = Order.objects.get(user=request.user, cart_order_id=self.request.user.cart.cart_order_id)
            serializer = self.get_serializer(x)
            return Response(serializer.data)
        except Order.DoesNotExist:
            pass

        # for x in request.user.order_set.all():
        #     if x.cart_order_id == self.request.user.cart.cart_order_id:
        #         serializer = self.get_serializer(x)
        #         return Response(serializer.data)

        return Response({"error": "Order not created yet"})


    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)



    @action(detail=False, methods=['Post'])
    def check_cod_available_for_current_order(self, request, *args, **kwargs):
        co = None

        try:
            co=Order.objects.get(user=request.user,cart_order_id=self.request.user.cart.cart_order_id)
        except Order.DoesNotExist:
            return Response({"error": "Order not created yet"})

        if cod_possible_check1(self.request.user, co.Address):
            if cod_possible_check2(self.request.user.cart.total):
                return Response({"Success": "cod  possible "})
            else:
                return Response({"error": "cod not possible price"})
        else:
            return Response({"error": "cod not possible address not default"})


    @action(detail=False, methods=['GET'])
    def check_if_error_with_any_product_view(self, request, *args, **kwargs):
        q= check_if_error_with_any_product(request.user)
        if q == False:
            return Response({"Success": "No error"})
        else:
            return Response(q)

    @action(detail=False, methods=['Post'])
    def set_payment_option(self,request):
        data = request.data

        try:
            mode = data["mode"]
        except Exception as e:
            return Response({"error": "mode not provided"})
        if mode not in ["cod","razorpay"]:
            return Response({"error": "select cod or Razoprpay"})

        co = None
        try:
            co=Order.objects.get(user=request.user,cart_order_id=self.request.user.cart.cart_order_id)
        except Order.DoesNotExist:
            return Response({"error": "Order not created yet"})
        # if mode == co.payment_method:
        #     return Response({"Success": "no-change"})
        if mode == "razorpay" and co.Payment != None:
            return Response({"Success": "razorpay set  ##{}".format(co.Payment.razorpay_OrderId)})


        if mode == "cod":
            if cod_possible_check1(self.request.user, co.Address):
                if cod_possible_check2(self.request.user.cart.total):

                    # co.payment_method="razorpay"
                    co.payment_method="cod"
                    co.save()

                    return place_order(self.request,co)

                    return Response({"Success": "cod set"})
                else:
                    return Response({"error": "cod not possible price"})
            else:
                return Response({"error": "cod not possible add not default"})

        if mode == "razorpay":
            co.payment_method="razorpay"
            total=0
            if request.user.cart.coupons == None:
                total=request.user.cart.with_shiphing_charge
            else:
                total=request.user.cart.after_coupon_applied

            a=Payment.objects.create()
            q=a.create_order(total,co.OrderId)


            if q == False or q == 404 :
                return Response({"error": "razorpay error try again later"})
            a.save()
            co.Payment=a
            co.save()
            return Response({"Success": "razorpay set  ##{}".format(a.razorpay_OrderId)})


    @action(detail=True, methods=['Post'])
    def place_order(self,request,pk,*args,**kwargs):
        co =self.get_object()
        # try:
        #     co=Order.objects.get(user=request.user,cart_order_id=self.request.user.cart.cart_order_id)
        # except Order.DoesNotExist:
        #     return Response({"error": "Order not created yet"})

        if co.Order_status != "notplaced":
            return Response({"error": "order already placed completed"})

        if self.request.user.cart.products.all().count() <= 0:
            return Response({"error":"no product in cart"})

        q= check_if_error_with_any_product(request.user)

        if q != False:
            return Response(q)

        if co.payment_method == "None":
            return Response({"error": "payment not completed"})
        if co.payment_method == "razorpay" and co.Payment.razorpay_OrderId_status !="paid":
            return Response({"Success": "payment not completed"})


        co.coupons = self.request.user.cart.coupons

        #     add user in coupon used
        if self.request.user.cart.coupons != None:
            self.request.user.cart.coupons.usedBY.add(self.request.user)
            self.request.user.cart.coupons.save()

        co.save()
        createorder(request.user,co)
        clear_cart_and_update_seesion(request.user)
        co.Order_status="placed"
        co.order_placedon= timezone.now()
        co.save()
        return Response({"Success": "order_placed"})


    @action(detail=True, methods=['Post'])
    def cancel_order(self,request,*args,**kwargs):
        co =self.get_object()
        data=request.data
        try:
            reason = data["reason"]
        except Exception as e:
            return Response({"error": "reason not provided"})


        if co.Order_status == "notplaced":
            return Response({"error": "not placed yet bitch"})

        if co.Order_status == "placed":
            try:
                co.Order_status = "UserCancle"
                delete_products_created(co.Ordered_products)
                co.order_status_on_wp_server=False
                co.reason=reason
                co.save()
                return Response({"Success": "Internal error"})
            except Exception as e:
                return Response({"error": "Internal error"})
        if co.Order_status == "Processing":
            return Response({"error": "Already Processing  bitch"})
        if co.Order_status == "Shipped":
            return Response({"error": "Already Shipped  bitch"})

        if co.Order_status == "Out For Delivery":
            return Response({"error": "Already Out For Delivery  bitch"})

        if co.Order_status == "Delivered":
            return Response({"error": "Already Delivered  bitch"})

        if co.Order_status == "Cancelled":
            return Response({"error": "Already cancaled  bitch"})

    @action(detail=False, methods=['get'])
    def get_all_images(self,request,*args,**kwargs):
        a=Products.objects.all().values("default__image","id","name","category")
        json = JSONRenderer().render(a)
        return Response(json)


    @action(detail=False, methods=['POST'])
    def verify_payment(self,request,*args,**kwargs):
        data = request.data
        print(data)

        try:
            razorpay_payment_id = data["razorpay_payment_id"]
        #     razorpay_payment_id_validator.__call__(razorpay_payment_id)
        # except ValidationError as e:
        #     return Response({"error": "provide valid razorpay_payment_id"})
        except Exception as e:
            return Response({"error": "razorpay_payment_id not provided"})

        try:
            razorpay_order_id = data["razorpay_order_id"]
        #     razorpay_order_id_validator.__call__(razorpay_order_id)
        # except ValidationError as e:
        #     return Response({"error": "provide valid razorpay_order_id"})

        except Exception as e:
            return Response({"error": "razorpay_order_id not provided"})

        try:
            razorpay_signature = data["razorpay_signature"]
        #     razorpay_signature_validator.__call__(razorpay_signature)
        # except ValidationError as e:
        #     return Response({"error": "provide valid razorpay_signature"})
        except Exception as e:
            return Response({"error": "razorpay_payment_id not provided"})

        try:
            co = Order.objects.get(user=request.user, cart_order_id=self.request.user.cart.cart_order_id)
        except Order.DoesNotExist:
            return Response({"eroor":"order not created yer"})
        # razorpay_signature:""
        a=co.Payment.verify_and_set_razorpay_payment_id_status(razorpay_payment_id,razorpay_signature) == True
        if a:
            return place_order(self.request,co)
        else:
            return a


