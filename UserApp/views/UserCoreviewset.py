from django.core.exceptions import ValidationError
from phonenumber_field.validators import validate_international_phonenumber
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib import auth

from ..custom_functions import list, email_verfy_core, SMS_verfy_core
from django.contrib.auth import password_validation
from django.core.validators import validate_email

from ..Permissions import Owneronly
from ..models import User
from ..serializer import UserserializerCoreOperations, PasswordSerializer
import logging

from ..serializer.PhoneSerailizer import Phoneserailizer

logger = logging.getLogger('console')


class UserCoreOperationsViewset(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserserializerCoreOperations
    permission_classes = [Owneronly]

    def list(self, request, *args, **kwargs):
        return list(self, request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        data = request.data

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data['email']
        password = serializer.data['password']
        re_password = serializer.data['re_password']

        try:
            if password == re_password:
                if User.objects.filter(email=email).exists():
                    return Response({'error': 'email already exists'})
                else:
                    try:
                        password_validation.validate_password(password)
                    except ValidationError:
                        return Response({'error': "password_short"})
                    if len(password) < 6:
                        return Response({'error': 'Password must be at least 6 characters'})
                    else:
                        user = User.objects.create_user_custom(email=email, password=password)
                        email_verfy_core(email, host=request.get_host())

                        logger.info(f'{user.email} User Created ')
                        # user.phone_number = phonenumber
                        # user.save()

                        # user.is_active =False
                        # user = auth.authenticate(email=email, password=password)
                        return Response({'success': 'User created successfully'})
            else:
                return Response({'error': 'Passwords do not match'})
        except:
            return Response({'error': 'Something went wrong when registering account'})

    @action(detail=False, methods=['post'])
    def email_verify(self, request, pk=None):
        data = self.request.data
        try:
            email = data['email']
        except KeyError:
            return Response({'error': "email not found in form data"})

        try:
            validate_email(email)
        except ValidationError:
            return Response({'error': "invalid-email"})
        print('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

        logger.info(f'{email} emaiverify sent ')

        return email_verfy_core(email, host=request.get_host())

    @action(detail=False, methods=['post'])
    def email_verify_conform(self, request, pk=None):
        data = self.request.data
        try:
            email_token = data['token']
        except KeyError:
            return Response({'error': "email_token not found in form data"})

        print(email_token)

        if email_token == "":
            return Response({'error': 'no token exist'})
        # if email_token == "":
        #     return Response({'error': 'no token exist'})
        #
        try:
            user = User.objects.get(email_token=f"{email_token}")
            if user.is_active == True:
                return Response({'success': f'email already verified '})
            user.is_active = True
            user.save()
            logger.info(f'{user.email} emaiverify conform ')

            return Response({'success': f'email verified '})

        except User.DoesNotExist:
            return Response({'token': 'no token exist'})
        except Exception as e:
            print(e)
            return Response({'error': 'some unexpected error'})

    @action(detail=False, methods=['post'])
    def SMS_verify(self, request, pk=None):
        data = self.request.data

        if not request.user.is_authenticated:
            return Response({'auth': "autherror"})

        if request.user.phone_number_verify:
            return Response({'already': "already verified"})

        serializer = Phoneserailizer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            try:
                phone = data['phone_number']
            except KeyError:
                return Response({'error': "phone_number not found in form data"})
            print(phone)
            UU = User.objects.filter(phone_number=phone)
            exceptions=request.user.phone_number != phone

            if len(UU) == 0:
                request.user.phone_number = phone
                request.user.save()
                return SMS_verfy_core(email=request.user.email, host=request.get_host(),exception=exceptions)
            elif len(UU) == 1 and UU[0].phone_number_verify == False and UU[0].id == request.user.id:
                request.user.phone_number = phone
                request.user.save()
                return SMS_verfy_core(email=request.user.email, host=request.get_host(),exception=exceptions)
            elif len(UU) == 1 and UU[0].phone_number_verify == False:
                UU[0].phone_number = ""
                UU[0].save()
                request.user.phone_number = phone
                request.user.save()

                logger.info(f'{request.user.email} Sms sent ')
                return SMS_verfy_core(email=request.user.email, host=request.get_host(),exception=exceptions)
            else:
                    return Response({'error': "phone_number is regised to another account"})

    @action(detail=False, methods=['post'])
    def SMS_verify_conform(self, request, pk=None):
        data = self.request.data
        try:
            email_token = data['token']
        except KeyError:
            return Response({'error': "SMS_token not found in form data"})

        print(email_token)
        if email_token == "":
            return Response({'error': 'no token exist'})

        try:
            user = User.objects.get(SMS_token=f"{email_token}")
            if user.phone_number_verify == True:
                return Response({'success': f'Number already verified '})
            user.phone_number_verify = True
            user.SMS_token = ""
            user.save()
            logger.info(f'{user.email} Sms verified ')

            return Response({'success': f'Number verified '})

        except User.DoesNotExist:
            return Response({'error': 'no token exist'})
        except Exception as e:
            print(e)
            return Response({'error': 'some unexpected error'})

    @action(detail=False, methods=['post'])
    def login(self, request, pk=None):
        data = self.request.data

        try:
            email = data['email']
        except KeyError:
            return Response({'error': "email not found in form data"})

        try:
            password = data['password']
        except KeyError:
            return Response({'error': "password not found in form data"})

        try:

            user = auth.authenticate(email=email, password=password)

            if user is not None:
                auth.login(request, user)
                logger.info(f'{user.email} looged in  type-{user.is_superuser} **/true for superuser ')
                return Response({'success': 'User authenticated'})
            else:

                try:
                    a = User.objects.get(email=email)
                    if a.is_active == False:
                        return Response({'error': 'account not activated yet'})

                except User.DoesNotExist:
                    return Response({'error': 'email does not exist'})

                if a.check_password(password) == False:
                    return Response({'error': 'wrong password'})

                return Response({'error': 'Error Authenticating'})
        except Exception as e:
            print(e)
            return Response({'error': 'Something went wrong when logging in'})

    @action(detail=True, methods=['post'])
    def change_password(self, request, pk=None):
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'error': ['old password wrong']},
                                status=status.HTTP_400_BAD_REQUEST)
            try:
                password_validation.validate_password(serializer.data.get('new_password'))
            except ValidationError:
                return Response({'error': "password_short"})

            user.set_password(serializer.data.get('new_password'))
            user.save()
            logger.info(f'{user.email} PasswordChange success in')


            return Response({'success': 'password set'}, status=status.HTTP_200_OK)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

