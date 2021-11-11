import logging

import requests
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.urls import reverse
from rest_framework.response import Response

from UserApp.models import User
from WearPakauOfficial.settings import EMAIL_HOST_USER, SMS_authorization, SMS_sender_id, SMS_message_id

logger = logging.getLogger('console')


def list(self, request, *args, **kwargs):
    queryset = self.filter_queryset(self.get_queryset())
    if request.user.is_anonymous:
        return Response()

    if request.user.is_coreTeam == False or request.user.is_developer == False:
        queryset = queryset.filter(id=request.user.id)

    page = self.paginate_queryset(queryset)
    if page is not None:
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)


def email_verfy_core(email, host):
    try:
        user = User.objects.get(email=email)

        a = user.create_email_Token()
        user.save()

        if a == True:
            context = {
                'current_user': user,
                'email': user.email,
                'reset_password_url': "{}{}?token={}".format(host,
                                                             reverse('emailverifyconform'),
                                                             user.email_token)
            }

            email_html_message = render_to_string('email/user_reset_password.html', context)
            email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

            msg = EmailMultiAlternatives(
                # title:
                "Password Reset for {title}".format(title="Some website title"),
                # message:
                email_plaintext_message,
                # from:
                EMAIL_HOST_USER,
                # to:
                [user.email]
            )
            msg.attach_alternative(email_html_message, "text/html")
            msg.send()

            return Response({'success': f'email sent '})
        else:
            return Response({'success': f'email already  sent  on email {email}'})

    except User.DoesNotExist:
        return Response({'error': 'email does not exist'})
    except Exception as e:
        print(e)
        return Response({'error': 'some unexpected error'})


def SMS_verfy_core(email, host, exception=False):
    try:
        user = User.objects.get(email=email)

        a = user.create_SMS_Token(exception=exception)
        user.save()

        # print(user.phone_number.national_number)
        # print(dir(user.phone_number))
        # # return Response({"ddd": user.phone_number})
        #
        # url = f"https://2factor.in/API/V1/ba5c3e4f-26af-11ec-a13b-0200cd936042/SMS/{user.phone_number.national_number}/{user.SMS_token}/OtP+verification1"
        # print(url)

        if a == True:
            url = f"https://2factor.in/API/V1/ba5c3e4f-26af-11ec-a13b-0200cd936042/SMS/{user.phone_number.national_number}/{user.SMS_token}/OtP+verification1"
            response = requests.request("GET", url)
            json_data = response.json()

            if response.status_code == requests.codes.ok:
                b = json_data
                if b["Status"] == "Success":
                    logger.info(f'{email} SMSverify sent {url} ')
                    return Response({'success': f'SMS sent '})
                if b["Status"] == "Error":
                    if b["Details"] == "Invalid API Key":
                        logger.error(f'{email} SMSverify Failed  Invalid API Key {url} ')
                    else:
                        logger.info(f'{email} SMSverify Failed {url} ')
                    return Response({'error': f'Invalid Phone Number '})

            elif response.status_code == 411:
                logger.info(f'{email} SMSverify Failed {url} 411 ')
                return Response({'error': 'wrong number'})
            else:
                return Response({'error': 'internal error'})
        else:
            return Response({'success-already': f'SMS already  sent  on phone_number {user.phone_number}'})

    except User.DoesNotExist:
        return Response({'error': 'SMS does not exist'})
    except Exception as e:
        print(e)
        return Response({'error': 'some unexpected error'})
