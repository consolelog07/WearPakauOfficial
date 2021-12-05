import json

from django.shortcuts import render

# Create your views here.
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from orders.models import Payment
from orders.models.Payment import client


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })

class validateWebhook(APIView):
    permission_classes = (permissions.AllowAny, )
    def post (self,request,pk=None):
        # print(request.headers)
        # print(request.data)

        try:
            a=client.utility.verify_webhook_signature(json.dumps(request.data,separators=(',', ':')), request.headers['X-Razorpay-Signature'], "123456789")
            if a == None:

                try:
                    b=Payment.objects.get(razorpay_OrderId=request.data["payload"]["order"]["entity"]["id"])
                except Payment.DoesNotExist as e:
                    pass
                print( b.verify_and_set_razorpay_payment_id_status(request.data["payload"]["payment"]["entity"]["id"],request.headers['X-Razorpay-Signature']))
        except Exception as e:
            print(e)

        return Response({"status":"ok"},status=HTTP_200_OK)



class Check_Authenticated(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self,request,pk=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'NotAuthenticated': 'error' })

        except:
                return Response({ 'error': 'Something went wrong when checking authentication status' })

