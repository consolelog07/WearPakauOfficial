from rest_framework import serializers
from UserApp.models import User
from ..models import Restricted_hostname


class Restricted_hostname_serializers(serializers.ModelSerializer):
    class Meta:
        model = Restricted_hostname
        fields = '__all__'
        depth = 8