from json.decoder import JSONDecodeError
from UserApp.models import User

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

import json
from Products.models import Products, Images
from UserApp.Permissions import Owneronly
from UserApp.custom_functions import list
from ..models import Cart, Product_wrapper, Coupons

from ..Serailizer import Cart_serailizer


class CartOperationsViewset(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = Cart_serailizer
    permission_classes = [IsAuthenticated, Owneronly]

    def list(self, request, *args, **kwargs):
        return list(self, request, *args, **kwargs)

    # only as user
    @action(detail=False, methods=['Post'])
    def add_in(self, request, *args, **kwargs):
        data = request.data
        # print(data)
        # {id="product id",QrJson="Image_id",Quantity:"Quantity_number",size:""}

        try:
            product_id = data["id"]
        except Exception as e:
            return Response({"error": "id not provided"})
        # print(product_id)
        try:
            QrJson = data["QrJson"]
        except Exception as e:
            return Response({"error": "QrJson not provided"})

        try:
            Quantity = data["Quantity"]
        except Exception as e:
            Quantity = 1

        try:
            a = Products.objects.get(id=product_id)
        except Products.DoesNotExist:
            return Response({'error': 'Product does not exist'})
        if a.disable == True:
            return Response({'error': 'Product Out OF Stock'})

        size = None
        if a.sizes != "":
            try:
                size = data["size"]
            except Exception as e:
                return Response({"error": "size not provided"})
            if size == "":
                return Response({"error": "Select Size"})
        elif a.sizes == "":
            size = ""

        b = Cart.objects.get(user_id=self.request.user.id)

        # print("BBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        try:
            for x in b.products.all():
                print(x.Product.id == a.id, x.QrJson == QrJson, x.Product.id, a.id)
                if x.Product.id == a.id and x.QrJson == QrJson and x.size == size:
                    if x.Quantity != Quantity:
                        x.Quantity = Quantity
                        x.save()
                    else:
                        # print("BBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
                        return Response({'Success-Updated': 'Nothing changed'})
                    return Response({'Success-Updated': 'Product added in cart'})
            else:
                wrapper = Product_wrapper(Product=a, QrJson=QrJson, Quantity=Quantity, size=size)
                wrapper.save()
                # print(wrapper)
                b.products.add(wrapper)
                b.save()
                return Response({'Success': 'Product added in cart'})


        except Exception as e:
            # print(e)
            return Response({'error': e})

        return Response({'error': 'Some error'})

    @action(detail=False, methods=['Post'])
    def remove(self, request, *args, **kwargs):
        data = request.data
        # print(data)
        # {id="product id",QrJson="QrJson",Quantity:"Quantity_number",size:""}

        try:
            product_id = data["id"]
        except Exception as e:
            return Response({"error": "id not provided"})
        # print(product_id)

        try:
            QrJson = data["QrJson"]
        except Exception as e:
            return Response({"error": "QrJson not provided"})

        try:
            a = Products.objects.get(id=product_id)
        except Products.DoesNotExist:
            return Response({'error': 'Product does not exist'})

        size = None
        if a.sizes != "":
            try:
                size = data["size"]
            except Exception as e:
                return Response({"error": "size not provided"})
        elif a.sizes == "":
            size = ""

        b = Cart.objects.get(user_id=self.request.user.id)
        # print("BBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        try:
            for x in b.products.all():
                # print(x.Product.id == a.id,x.QrPattern_Image.id == c,x.Icon == Icon,x.Product.id,a.id,x.QrPattern_Image.id,c,x.Icon,Icon)
                if x.Product.id == a.id and x.QrJson == QrJson and x.size == size:
                    b.products.remove(x)
                    x.delete()
                    return Response({'Success-Updated': 'Product removed from cart'})
            else:
                return Response({'error': 'Product not in cart'})

        except Exception as e:
            print(e)
            return Response({'error': e})

    # @action(detail=False, methods=['Post'])
    # def add_email(self, request, *args, **kwargs):
    #     data = request.data
    #     print(data)
    #     # {id="product id",QrJson="QrJson",Quantity:"Quantity_number"}
    #
    #     try:
    #         product_wrapper_id = data["id"]
    #     except Exception as e:
    #         return Response({"error": "id not provided"})
    #     print(product_wrapper_id)
    #
    #     try:
    #         a = Product_wrapper.objects.get(id=product_wrapper_id)
    #     except Product_wrapper.DoesNotExist:
    #         return Response({'error': 'Product_wrapper does not exist'})
    #
    #     try:
    #         emaillist = data["id"]
    #     except Exception as e:
    #         return Response({"error": "id not provided"})
    #     print(product_wrapper_id)
    #
    #     try:
    #         emaillist = json.loads(emaillist)
    #     except JSONDecodeError as e:
    #         return Response({"error": "email format sent wrong"})
    #
    #     if type(emaillist) != list:
    #         return Response({"error": "email format sent wrong"})
    #
    #     # check=False
    #     # emaillist=[]
    #     # if len(emaillist) >
    #     # # for x,y in enumerate(emaillist):
    #     #

    @action(detail=False, methods=['Post'])
    def CanapplyCoupon(self, request, *args, **kwargs):
        data = request.data
        # print(data)
        # {Code="Code"}

        try:
            Code = data["Code"]
        except Exception as e:
            return Response({"error": "Code not provided"})

        try:
            Coupon = Coupons.objects.get(Code=Code)
        except Coupons.DoesNotExist:
            return Response({'error': 'Coupon does not exist'})

        if not Coupon.active:
            return Response({'error': 'Coupon not active'})

        if Coupon.usedBY.filter(pk=request.user.id).exists():
            return Response({'error': 'already used'})

        Cart_instance = Cart.objects.get(user_id=self.request.user.id)
        Cart_instance.coupons = Coupon
        Cart_instance.save()

        return Response({'Success': 'Coupon applied successfully'})

    @action(detail=False, methods=['Post'])
    def RemoveCoupon(self, request, *args, **kwargs):

        Cart_instance = Cart.objects.get(user_id=self.request.user.id)
        Cart_instance.coupons = None
        Cart_instance.save()

        return Response({'Success': 'Coupon applied successfully'})


    @action(detail=False, methods=['get'])
    def Return_cart_id_of_user(self, *args, **kwargs):
        user = self.request.user
        print(user, self.request.auth, args, kwargs)

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                Cart_instance = Cart.objects.get(user_id=user.id)
                return Response({'iD': Cart_instance.id})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})

    @action(detail=True, methods=['get'])
    def Reset_cart(self, *args, **kwargs):
        # print(args, kwargs)
        b = Cart.objects.get(user_id=self.request.user.id)

        for x in b.products.all():
            b.products.remove(x)
            x.delete()
        return Response({"Success": f"cart reset done of user {self.request.user}"})
