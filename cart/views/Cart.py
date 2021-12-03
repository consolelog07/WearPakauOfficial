import logging
from json.decoder import JSONDecodeError
from UserApp.models import User

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

import json
from Products.models import Products, Images
from UserApp.Permissions import Owneronly
from UserApp.custom_functions import list
from ..models import Cart, Product_wrapper, Coupons

from ..Serailizer import Cart_serailizer

logger = logging.getLogger('console_cart')



class CartOwnerOwnly(permissions.BasePermission):
    message = 'Cart view authority not allowed'


    def has_object_permission(self, request, view, obj):
        user = request.user

        if request.user.is_anonymous:
            return False
        if obj.user.id == user.id:
            return True
        if user.is_developer:
            return True
        if user.is_coreTeam:
            return True

class CartOperationsViewset(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = Cart_serailizer
    permission_classes = [IsAuthenticated, CartOwnerOwnly]

    def list(self, request, *args, **kwargs):
        try:
            b = Cart.objects.get(user_id=self.request.user.id)
        except Cart.DoesNotExist:
            logger.error(f'{self.request.user.email}  cart doesnot exist successfully')
            b=Cart.objects.create(user=self.request.user)
            b.save()
        if request.user.is_coreTeam == False or request.user.is_developer == False:
            print("ddddddddddddddddddddddddddddd")
            queryset = self.filter_queryset(self.get_queryset())
            queryset = queryset.filter(user_id=request.user)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

        return list(self, request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return Response({"error":"forbiden"})


    @action(detail=False, methods=['Post'])
    def add_in(self, request, *args, **kwargs):
        data = request.data
        print("je;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
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


        try:
            b = Cart.objects.get(user_id=self.request.user.id)
        except Cart.DoesNotExist:
            logger.error(f'{self.request.user.email}  cart doesnot exist successfully')
            b=Cart.objects.create(user=self.request.user)
            b.save()

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
                        # logger.info(f'{request.user.email} {x.QrJson} {x.Product.id}{a.id} Nothing changed cart ')
                        return Response({'Success-Updated': 'Nothing changed'})

                    # logger.info(f'{self.request.user.email}   Product added in cart ')
                    return Response({'Success-Updated': 'Product added in cart'})
            else:
                wrapper = Product_wrapper(Product=a, QrJson=QrJson, Quantity=Quantity, size=size)
                wrapper.save()
                # print(wrapper)
                b.products.add(wrapper)
                b.save()
                logger.info(f'{request.user.email}   product created cart ')
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

        try:

            b = Cart.objects.get(user_id=self.request.user.id)
        except Cart.DoesNotExist:
            logger.error(f'{self.request.user.email}  cart doesnot exist successfully')
            b=Cart.objects.create(user=self.request.user)
            b.save()



# print("BBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        try:
            for x in b.products.all():
                # print(x.Product.id == a.id,x.QrPattern_Image.id == c,x.Icon == Icon,x.Product.id,a.id,x.QrPattern_Image.id,c,x.Icon,Icon)
                if x.Product.id == a.id and x.QrJson == QrJson and x.size == size:
                    b.products.remove(x)
                    x.delete()
                    logger.info(f'{request.user.email}  {x.Product.id}{a.id} Product removed from cart')
                    return Response({'Success-Updated': 'Product removed from cart'})
            else:
                return Response({'error': 'Product not in cart'})

        except Exception as e:
            print(e)
            return Response({'error': e})

    @action(detail=False, methods=['Post'])
    def CanapplyCoupon(self, request, *args, **kwargs):
        data = request.data
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

        try:
            Cart_instance = Cart.objects.get(user_id=self.request.user.id)
        except Cart.DoesNotExist:
            logger.error(f'{self.request.user.email}  cart doesnot exist successfully')
            Cart_instance =Cart.objects.create(user=self.request.user)
            Cart_instance.save()

        Cart_instance.coupons = Coupon
        Cart_instance.save()

        logger.info(f'{request.user.email} {Coupon} Coupon applied successfully')
        return Response({'Success': 'Coupon applied successfully'})

    @action(detail=False, methods=['Post'])
    def RemoveCoupon(self, request, *args, **kwargs):
        try:
            Cart_instance = Cart.objects.get(user_id=self.request.user.id)
        except Cart.DoesNotExist:
            logger.error(f'{self.request.user.email}  cart doesnot exist successfully')
            Cart_instance =Cart.objects.create(user=self.request.user)
            Cart_instance.save()


        Coupon=Cart_instance.coupons
        Cart_instance.coupons = None
        Cart_instance.save()

        logger.info(f'{request.user.email} {Coupon} Coupon applied successfully')
        return Response({'Success': 'Coupon applied successfully'})


    @action(detail=False, methods=['get'])
    def Return_cart_id_of_user(self, *args, **kwargs):
        user = self.request.user
        print(user, self.request.auth, args, kwargs)

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                try:
                    Cart_instance = Cart.objects.get(user_id=user.id)
                except Cart.DoesNotExist:
                    logger.error(f'{self.request.user.email}  cart doesnot exist successfully')
                    Cart_instance =Cart.objects.create(user=self.request.user)
                    Cart_instance.save()

                logger.info(f'{self.request.user.email} {Cart_instance.id} cartidsent successfully')

                return Response({'iD': Cart_instance.id})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


    @action(detail=True, methods=['get'])
    def Reset_cart(self, *args, **kwargs):
        # print(args, kwargs)

        try:
            b = Cart.objects.get(user_id=self.request.user.id)
        except Cart.DoesNotExist:
            logger.error(f'{self.request.user.email}  cart doesnot exist successfully')
            b =Cart.objects.create(user=self.request.user)
            b.save()

        for x in b.products.all():
            b.products.remove(x)
            x.delete()
            logger.info(f'{self.request.user.email} {x} prodcut wrapper successfully removed')

        return Response({"Success": f"cart reset done of user {self.request.user}"})

    @action(detail=False, methods=['get'])
    def get_user_cart(self,request,*args,**kwargs):
        try:
            a=Cart.objects.get(user=self.request.user)
        except Cart.DoesNotExist:
            return Response({"error":"no cart created"})
        except Cart.MultipleObjectsReturned:
            return Response({"error":"internal error"})
        serializer = self.get_serializer(a)
        return Response(serializer.data)
