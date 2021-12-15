from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string
import razorpay
from razorpay.errors import SignatureVerificationError
from rest_framework.response import Response

from WearPakauOfficial.settings import razorpay_key_id, razorpay_key_secret

client = razorpay.Client(auth=(razorpay_key_id, razorpay_key_secret))

Order_state_choices = (
    ("created", "created"),
    ("paid", "paid"),
)
Payment_state_choices = (
    ("captured", "captured"),
    ("refunded", "refunded")
)


# {'id': 'order_INAt8t1BIRnh4Y', 'entity': 'order', 'amount': 500, 'amount_paid': 0, 'amount_due': 500, 'currency': 'INR', 'receipt': 'order_rcptid_11', 'offer_id': None, 'status': 'created', 'attempts': 0, 'notes': [], 'created_at': 1637262128}


class Payment(models.Model):
    razorpay_OrderId = models.CharField(max_length=225)
    razorpay_payment_id = models.CharField(max_length=225, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=225, default=None, blank=True, null=True)

    razorpay_payment_succestime = models.DateTimeField(blank=True, null=True)
    razorpay_payment_refundtime = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    razorpay_OrderId_status = models.CharField(max_length=225, choices=Order_state_choices, blank=True, null=True)
    razorpay_payment_id_status = models.CharField(max_length=225, choices=Payment_state_choices, blank=True, null=True)

    # if some issue in creation perfom in save
    def create_order(self, amount, orderId):
        print("''''''''''''''''''''''''''''''''''''''''''''''''''xxxxxxxxxxx", amount)
        # data = { "amount": amount, "currency": "INR", "receipt": self.pk}
        data = {"amount": amount * 100, "currency": "INR", "receipt": orderId}

        if self.razorpay_OrderId == "" or self.razorpay_OrderId == None:
            try:
                payment = client.order.create(data=data)
                self.razorpay_OrderId = payment["id"]
                self.razorpay_OrderId_status = "created"
                self.save()
                print(payment)
                return True
            except Exception as e:
                print("errrrrrrrrrrrrrrr", e)
                # logger err
                # forerror
                return 404
        # if already created
        return False

    @property
    def Total_(self):
        try:
            a=self.order_set.all()[0].after_coupon_applied
            return a
        except Exception as e:
            return None
    @property
    def giftwrapcharge(self):
        try:
            a=self.order_set.all()[0].giftwrapcharge
            return a
        except Exception as e:
            return None

    @property
    def shipingcharge(self):
        try:
            a=self.order_set.all()[0].shipingcharge
            return a
        except Exception as e:
            return None


    @property
    def with_shiphing_charge(self):
        try:
            a=self.order_set.all()[0].with_shiphing_charge
            return a
        except Exception as e:
            return None


    @property
    def Order_id_wp(self):
        try:
              a=self.order_set.all()[0].OrderId
              return a
        except Exception as e:
            return None


    @property
    def Payment_completed(self):
        if self.razorpay_OrderId_status == "paid":
            return True
        else:
            return False

    @property
    def user(self):
        try:
            a=str(self.order_set.all()[0].user)
            return a
        except Exception as e:
            return None

    def verify_and_set_razorpay_payment_id_status(self, payment_id, razorpay_signature):
        if (
                self.razorpay_payment_id == "" or self.razorpay_payment_id is None):
            # and self.razorpay_payment_id_status == "created"\

            params_dict = {
                'razorpay_order_id': self.razorpay_OrderId,
                'razorpay_payment_id': payment_id,
                'razorpay_signature': razorpay_signature
            }

            try:
                result = client.utility.verify_payment_signature(params_dict)
            except SignatureVerificationError as e:
                # admin log
                return Response({"error": "internalerror if money is dedected we will refund it"})
            if result is None:
                try:
                    self.razorpay_payment_id = payment_id
                    self.razorpay_payment_id_status = "captured"
                    self.razorpay_OrderId_status = "paid"
                    self.razorpay_signature = razorpay_signature
                    self.razorpay_payment_succestime = timezone.now()
                    self.save()
                    return True
                except Exception as e:
                    # admin log
                    return Response({"error": "internalerror "})
            # forerror
            return Response({"error": "paymentId invalid"})

        return True
