from urllib.parse import urlparse
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError

from .models import Restricted_hostname


def validator_hostname(url):

    result = urlparse(url)
    # print(result,result.hostname)
    try:
        if result.hostname == "":
            return False

        found=Restricted_hostname.objects.filter(hostname=result.hostname)
        if found.count() > 0:
            # print(">0cccccccccccccccccccc")
            raise ValidationError(
                _('%(value)s hostname is restriced'),
                params={'value': result.hostname},
            )
        else:
            print("<0cccccccccccccccccccc")
            return True
    except Restricted_hostname.DoesNotExist as e:
        print("Do not exirst")
        return True
