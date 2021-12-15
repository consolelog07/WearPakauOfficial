import logging

from django.urls import reverse
from django.utils import timezone

from django.utils.crypto import get_random_string
from rest_framework.response import Response

from Ordered_User_products.models import Ordered_User_products
from WearPakauOfficial.settings import Default_giftwrapcharge
from cart.models import Cart
from orders.models import Address
logger = logging.getLogger('console_Order')
import http.client

def cod_possible_check2(orderprice):
    if orderprice <= 1500:
        return True
    else:
        return False


def cod_possible_check1(user, address):
    try:
        a = Address.objects.get(user=user, default=True)
        if a.id == address.id:

            return True
        else:
            return False

    except Address.DoesNotExist:
        return False
    except Address.MultipleObjectsReturned:
        return False


def createorder(user,co):
    cart = Cart.objects.get(id=user.cart.id)

    uuidlist = []
    for x in cart.products.all():
        for y in range(x.Quantity):
            print(y)
            price=x.Product.price
            if x.Product.discount_display == True:
                price=x.Product.discounted_price

            a = Ordered_User_products.objects.create(Product=x.Product,QrJson=x.QrJson,size=x.size,price=price)
            uuidlist.append(a.unique_u14)

    for x in uuidlist:
        try:
            a = Ordered_User_products.objects.get(unique_u14=x)
            co.Ordered_products.add(a)
        except Ordered_User_products.DoesNotExist:
            raise Exception("Ordered_User_products does not exist in access")
    co.giftwrap=cart.giftwrap
    co.giftwrapcharge=cart.giftwrapcharge
    co.shipingcharge=cart.shipingcharge
    co.save()

def clear_cart_and_update_seesion(user):
    b = Cart.objects.get(id=user.cart.id)

    for x in b.products.all():
        b.products.remove(x)
        x.delete()
    b.cart_order_id = get_random_string(length=30)
    b.coupons=None
    b.giftwrap=False
    b.save()

    # logger.info(f'{self.request.user.email} {x} prodcut wrapper successfully removed')

def checkerror(user):
    cart = Cart.objects.get(id=user.cart.id)
    uuidlist = []
    for x in cart.products.all():
        if x.Product.disable == True or x.Product.display_to_user == False:
            uuidlist.append(x.id)
    return uuidlist

def check_if_error_with_any_product(user):
    q=checkerror(user)
    if q == []:
        return False
    else:
        return {"error_in_product":q}



def delete_products_created(Ordered_products):
    try:
        for x in Ordered_products:
            # suspendes the product from changing urls
            x.delete_product()
    except Exception as e:
        return False


def place_order(request,co):

    if co.Order_status != "notplaced":
        return Response({"error": "order already placed completed"})

    if request.user.cart.products.all().count() <= 0:
        return Response({"error":"no product in cart"})

    q= check_if_error_with_any_product(request.user)

    if q != False:
        return Response(q)

    if co.payment_method == "None":
        return Response({"error": "payment not completed"})
    if co.payment_method == "razorpay" and co.Payment.razorpay_OrderId_status !="paid":
        return Response({"error": "payment not completed"})


    co.coupons = request.user.cart.coupons

    #     add user in coupon used
    if request.user.cart.coupons != None:
        request.user.cart.coupons.usedBY.add(request.user)
        request.user.cart.coupons.save()

    co.save()
    createorder(request.user,co)
    clear_cart_and_update_seesion(request.user)
    co.Order_status="placed"
    co.order_placedon= timezone.now()
    co.save()
    trial(co,host=request.get_host())
    logger.info(f'Order user {request.user.email} {co.OrderId} order placed   ;')
    return Response({"Success": "order_placed"})


def trial(co,host):
    conn = http.client.HTTPSConnection('95ed400cb41cd224d40df407c6d7adae.m.pipedream.net')
    conn.request("POST", "/", '{'
                              '"OrderId":  "New Order Created  OrderId = '+str(co.OrderId)+'",'
                              '"ip_address": "92.188.61.181",'
                              '"email": "user@example.com",'
                              '"user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_4) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.100 Safari/534.30",'
                              '"url": "'+"{}{}".format(host,reverse("OrderAdminDetail",kwargs={'year': co.id}))+'"}'
                     , {'Content-Type': 'application/json'})

