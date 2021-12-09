from django.contrib import admin
from .models import Ordered_User_products,Restricted_hostname
# Register your models here.


class Restricted_hostnamemodeladmin(admin.ModelAdmin):
    list_display = ['hostname']
    search_fields = ['hostname']
    # list_filter = ["active"]
    # readonly_fields = ["usedBY"]
    class Meta:
        model = Restricted_hostname



admin.site.register(Restricted_hostname,Restricted_hostnamemodeladmin)



class Ordered_User_productsmodeladmin(admin.ModelAdmin):
    list_display = ["unique_u14",'user',"Product","Oup_url"]
    search_fields = ['unique_u14']
    list_filter = ["activated","Suspended","Product","size"]
    readonly_fields = ["unique_u14",
                       "orderedByuser",
                       "orderedBID",
                       "QrJson",
                       "activationCode",
                       "Oup_url",
                       'size',
                       "delete_order",
                       # "activated",
                       "navigate_to",


                       # "activated",
                       # "Product",
                       # "user",
                       ]
    exclude = ["activationCode"]

    class Meta:
        model = Ordered_User_products

    # def has_delete_permission(self, request, obj=None):
    #     return False




admin.site.register(Ordered_User_products, Ordered_User_productsmodeladmin)
