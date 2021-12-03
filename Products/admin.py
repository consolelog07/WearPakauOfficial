from django.contrib import admin
from .models import Products, ImagesSet, Images


# Register your models here.
class Productsmodeladmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price',"display_to_user"]
    search_fields = ['name', 'category', 'color']
    list_filter = ['category',"display_to_user"]

    class Meta:
        model = Products

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Products, Productsmodeladmin)


class ImagesSetmodeladmin(admin.ModelAdmin):
    list_display = ['Setname', ]
    search_fields = ['Setname']

    class Meta:
        model = ImagesSet


admin.site.register(ImagesSet, ImagesSetmodeladmin)


class Imagesmodeladmin(admin.ModelAdmin):
    list_display = ['name', ]
    search_fields = ['name']

    class Meta:
        model = Images


admin.site.register(Images, Imagesmodeladmin)

#
# class QrPatternmodeladmin(admin.ModelAdmin):
#     list_display = ['Setname']
#     search_fields = ['Setname']
#
#     class Meta:
#         model = QrPattern
#
#
# admin.site.register(QrPattern, QrPatternmodeladmin)
