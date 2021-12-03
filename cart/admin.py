from django.contrib import admin
from .models import Cart, Coupons, Product_wrapper


# Register your models here.
class Cartmodeladmin(admin.ModelAdmin):
    list_display = ['user',"cart_order_id"]
    search_fields = ['user',"cart_order_id"]
    readonly_fields = ["user",
                       "cart_order_id"
                       # ,"products"
                       ]


    def has_delete_permission(self, request, obj=None):
        return False
    def has_add_permission(self, request):
        return False

    class Meta:
        model = Cart


admin.site.register(Cart, Cartmodeladmin)


admin.site.register(Product_wrapper)


# class Product_wrappermodeladmin(admin.ModelAdmin):
#     list_display = ['Product', 'cart_set']
#
#     # search_fields = ['name']
#     # list_filter = ["active"]
#     # readonly_fields = ["usedBY"]
#
#     class Meta:
#         model = Product_wrapper
#
#
# admin.site.register(Product_wrapper, Product_wrappermodeladmin)


class Couponsmodeladmin(admin.ModelAdmin):
    list_display = ['Code', "active"]
    search_fields = ['Code']
    list_filter = ["active"]
    # readonly_fields = ["usedBY"]
    def has_delete_permission(self, request, obj=None):
        return False

    class Meta:
        model = Coupons



admin.site.register(Coupons, Couponsmodeladmin)
