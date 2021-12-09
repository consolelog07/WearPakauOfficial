from rest_framework import serializers
from UserApp.models import User
from ..models import Ordered_User_products


class Ordered_User_products_serializers(serializers.ModelSerializer):
    orderdby=serializers.ReadOnlyField(source="orderedByuser")
    orderedByID=serializers.ReadOnlyField(source="orderedBID")
    Oup_url_=serializers.SerializerMethodField()
    class Meta:
        model = Ordered_User_products
        fields = '__all__'
        depth = 8
        read_only_fields =["unique_u14"]

    def get_Oup_url_(self, obj):
        obj_url = obj.Oup_url
        return self.context["request"].build_absolute_uri(obj_url)