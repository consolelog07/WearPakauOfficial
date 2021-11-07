from datetime import timedelta

from django.core.exceptions import ValidationError
from django.utils import timezone
from django.core.validators import EmailValidator, validate_image_file_extension, validate_email, RegexValidator
from django.db import models
# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.urls import reverse
# reset
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.crypto import get_random_string
from django_rest_passwordreset.signals import reset_password_token_created
# from django_rest_passwordreset.views import
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password
import math, random

from phonenumber_field.validators import validate_international_phonenumber

from WearPakauOfficial.settings import EMAIL_HOST_USER


class UserManager(BaseUserManager):
    def create_user_custom(self, email, password, **kwargs):

        if email is None:
            raise TypeError('Users must have an  email.')
        if password is None:
            raise TypeError('users must have a password.')

        user = self.model(email=self.normalize_email(email))
        user.password = make_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password, **kwargs):

        if email is None:
            raise TypeError('Users must have an  email.')
        if password is None:
            raise TypeError('users must have a password.')

        user = self.model(email=self.normalize_email(email))
        user.password = make_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')

        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.is_coreTeam = True
        user.is_developer = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    # username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True, validators=[validate_email])
    First_name = models.CharField(max_length=225, blank=True, null=True)
    Last_name = models.CharField(max_length=225, blank=True, null=True)
    image = models.ImageField(upload_to='UserImage', blank=True, null=True, validators=[validate_image_file_extension])
    re_password = models.CharField(max_length=128, help_text='just to check password twice', blank=True, null=True)

    phone_number = PhoneNumberField(null=True, blank=True,
                                    validators=[validate_international_phonenumber,
                                                RegexValidator(
                                                    '^[6-9]\d{9}$',
                                                    message='enter indian number'
                                                ),
                                                ])

    email_token = models.CharField(max_length=53, blank=True, null=True)
    email_token_dateTime_expire = models.DateTimeField(auto_now_add=True)

    SMS_token = models.CharField(max_length=53, blank=True, null=True)
    SMS_token_dateTime_expire = models.DateTimeField(auto_now_add=True)
    phone_number_verify = models.BooleanField(default=False)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    is_coreTeam = models.BooleanField(default=False)
    is_developer = models.BooleanField(default=False)

    is_suspended = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['phone_number']
    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

    def suspend_user(self):
        self.is_suspended = True

    def Unsuspend_user(self):
        self.is_suspended = False

    def Upgrade_to_Superuser(self):

        # user = self.get( email)
        self.is_superuser = True
        self.is_staff = True
        self.is_coreTeam = True

    def create_email_Token(self):

        print(timezone.now() > self.email_token_dateTime_expire, timezone.now(), self.email_token_dateTime_expire)
        if timezone.now() > self.email_token_dateTime_expire:
            self.email_token = get_random_string(length=20)
            self.email_token_dateTime_expire = timezone.now() + timezone.timedelta(seconds=600)
            return True
        else:
            return False

    def create_SMS_Token(self,exception=False):

        print(timezone.now() > self.SMS_token_dateTime_expire, timezone.now(), self.SMS_token_dateTime_expire)
        if timezone.now() > self.SMS_token_dateTime_expire or exception :

            digits = "0123456789"
            OTP = ""

            for i in range(4):
                OTP += digits[math.floor(random.random() * 10)]

            self.SMS_token = OTP
            self.SMS_token_dateTime_expire = timezone.now() + timezone.timedelta(seconds=600)
            return True
        else:
            return False

    def Upgrade_to_Core(self):

        self.is_staff = True
        self.is_coreTeam = True

    def Downgrade_to_user(self):

        self.is_superuser = False
        self.is_staff = False
        self.is_coreTeam = False

    def get_absolute_url(self):
        return reverse('user-detail', kwargs={'pk': self.pk})


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokes
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('reset-password-confirm-frontend')),
            reset_password_token.key)
    }
    print(reverse('reset-password-confirm-frontend'))
    # render email text
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
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
