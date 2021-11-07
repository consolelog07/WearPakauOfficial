import requests
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.urls import reverse
from rest_framework.response import Response

from UserApp.models import User
from WearPakauOfficial.settings import EMAIL_HOST_USER , SMS_authorization ,SMS_sender_id ,SMS_message_id


def list(self, request, *args, **kwargs):
    queryset = self.filter_queryset(self.get_queryset())
    if request.user.is_anonymous:
        return Response()

    if  request.user.is_coreTeam == False or request.user.is_developer == False:
        queryset = queryset.filter(id = request.user.id)

    page = self.paginate_queryset(queryset)
    if page is not None:
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)


def email_verfy_core(email,host):
    try:
        user=User.objects.get(email=email)

        a=user.create_email_Token()
        user.save()

        if a ==True:
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

            return Response({ 'success': f'email sent ' })
        else:
            return  Response({ 'success': f'email already  sent  on email {email}' })

    except User.DoesNotExist:
        return Response({ 'error': 'email does not exist' })
    except Exception as e:
        print(e)
        return Response({ 'error': 'some unexpected error' })


def SMS_verfy_core(email,host,exception=False):
    try:
        user=User.objects.get(email=email)

        a=user.create_SMS_Token(exception=exception)
        user.save()
        if a ==True:

            url = "https://www.fast2sms.com/dev/bulkV2"
            payload = f"sender_id={SMS_sender_id}&message={SMS_message_id}&variables_values={SMS_message_id}&route" \
                      f"=dlt&numbers={user.phone_number} "
            headers = {
                'authorization': f"{SMS_authorization}",
                'Content-Type': "application/x-www-form-urlencoded",
                'Cache-Control': "no-cache",
            }

            response = requests.request("POST", url, data=payload, headers=headers)
            json_data=response.json()
            if response.status_code == requests.codes.ok:
                return Response({'success': f'SMS sent '})
            elif response.status_code == 411:
                return Response({'error': 'wrong number'})
            else:
                return Response({'error': 'internal error'})

            # return Response({'success': f'SMS sent '})

        else:
            return  Response({ 'success-already': f'SMS already  sent  on phone_number {user.phone_number}' })

    except User.DoesNotExist:
        return Response({ 'error': 'SMS does not exist' })
    except Exception as e:
        print(e)
        return Response({ 'error': 'some unexpected error' })