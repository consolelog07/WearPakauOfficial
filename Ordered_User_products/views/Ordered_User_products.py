import logging

from django.core.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend, OrderingFilter
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.validators import URLValidator
from rest_framework.viewsets import GenericViewSet

from ..models import Ordered_User_products
from Ordered_User_products.serailizers import Ordered_User_products_serializers
from UserApp.custom_functions import list_user, list_user_content_only

logger = logging.getLogger('console_OUP')


class Ordered_User_products_Viewset(
                                    mixins.RetrieveModelMixin,
                                    mixins.ListModelMixin,
                                    GenericViewSet):
    queryset = Ordered_User_products.objects.all()

    serializer_class = Ordered_User_products_serializers
    permission_classes = [IsAuthenticated]
    # filter_backends = [
    #     DjangoFilterBackend,
    #     # DjangoFilterBackend,
    #     SearchFilter,OrderingFilter]
    # filter_fields=['discounted_price','category',"discount_display"]
    # search_fields = ['$name','=price','=discount_display','$category',"tags"]
    # ordering_fields = ['price','discounted_price']


    def list(self, request, *args, **kwargs):
        return list_user_content_only(self, request, *args, **kwargs)



    validate = URLValidator()
    @action(detail=False, methods=['Post'])
    def activate_product(self,request, *args, **kwargs):
        data = request.data
        try:
            product_id = data["uuid"]
        except Exception as e:
            return Response({"error": "uuid not provided"})


        try:
            product=Ordered_User_products.objects.get(unique_u14=product_id)
        except Ordered_User_products.DoesNotExist:
            logger.info(f'{request.user.email} DoesNotExist {product_id}')
            return Response({"error":"such product doesnot exist"})
        except Ordered_User_products.MultipleObjectsReturned:
            logger.error(f'{request.user.email} MultipleObjectsReturned {product_id}')
            # logger log issue
            return Response({"error":"such product doesnot exist"})
        except Exception as e:
            logger.error(f'{request.user.email} {Exception} {product_id}')
            # logger log issue
            return Response({"error":"such product doesnot exist"})



        if product.user == None:
            logger.info(f'{request.user.email} activated succesfully {product_id}')
            product.user=request.user
            product.activated=True
            product.save()

            return Response({"success":"Product registered for user {}".format(request.user.email)})
        else:
            logger.info(f'{request.user.email} activated unsuccesfully {product_id}')
            return Response({"error":"Product already registered"})

    @action(detail=False, methods=['Post'])
    def update_navigate_to(self,request, *args, **kwargs):
        data = request.data
        try:
            product_id = data["uuid"]
        except Exception as e:
            return Response({"error": "uuid not provided"})

        try:
            url = data["url"]
        except Exception as e:
            return Response({"error": "url not provided"})




        try:
            product=Ordered_User_products.objects.get(unique_u14=product_id)
        except Ordered_User_products.DoesNotExist:
            logger.info(f'{request.user.email} DoesNotExist {product_id}')
            return Response({"error":"such product doesnot exist"})
        except Ordered_User_products.MultipleObjectsReturned:
            logger.error(f'{request.user.email} MultipleObjectsReturned {product_id}')
            # logger log issue
            return Response({"error":"such product doesnot exist"})
        except Exception as e:
            logger.error(f'{request.user.email} {Exception} {product_id}')
            # logger log issue
            return Response({"error":"such product doesnot exist"})


        if product.user != request.user:
            return Response({"error":"you dont own this product"})





        try:
            self.validate(url)
        except ValidationError as e:
            logger.error(f'{request.user.email} invalid url http https not specified or not url {url} {product_id}')
            return Response({"error":"invalid url http https not specified or not url"})



        if product.update_navigate_to(url):

            product.save()
            logger.error(f'{request.user.email} url Updated {url} {product_id}')
            return Response({"success":"url Updated"})
        else:
            logger.error(f'{request.user.email} url blocked {url} {product_id}')
            return Response({"error":"url Updation failed invalid url domain blocked"})

    @action(detail=False, methods=['Post'])
    def GetDetailsOfProject(self,request, *args, **kwargs):
        data = request.data
        try:
            product_id = data["uuid"]
        except Exception as e:
            return Response({"error": "uuid not provided"})


        try:
            product=Ordered_User_products.objects.get(unique_u14=product_id)
        except Ordered_User_products.DoesNotExist:
            logger.info(f'{request.user.email} DoesNotExist {product_id}')
            return Response({"error":"such product doesnot exist"})
        except Ordered_User_products.MultipleObjectsReturned:
            logger.error(f'{request.user.email} MultipleObjectsReturned {product_id}')
            # logger log issue
            return Response({"error":"such product doesnot exist"})
        except Exception as e:
            logger.error(f'{request.user.email} {Exception} {product_id}')
            # logger log issue
            return Response({"error":"such product doesnot exist"})


        serializer = self.get_serializer(product)

        return Response({"success":serializer.data})



