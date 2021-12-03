from django.utils import timezone

from django.utils.crypto import get_random_string
from rest_framework.response import Response

from Ordered_User_products.models import Ordered_User_products
from cart.models import Cart
from orders.models import Address


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
            a = Ordered_User_products.objects.create(Product=x.Product,QrJson=x.QrJson,size=x.size)
            uuidlist.append(a.unique_u14)

    for x in uuidlist:
        try:
            a = Ordered_User_products.objects.get(unique_u14=x)
            co.Ordered_products.add(a)
        except Ordered_User_products.DoesNotExist:
            raise Exception("Ordered_User_products does not exist in access")
    co.save()

def clear_cart_and_update_seesion(user):
    b = Cart.objects.get(id=user.cart.id)

    for x in b.products.all():
        b.products.remove(x)
        x.delete()
    b.cart_order_id = get_random_string(length=30)
    b.coupons=None
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
    return Response({"Success": "order_placed"})