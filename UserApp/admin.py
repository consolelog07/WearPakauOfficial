from django.contrib import admin
from UserApp.models import User
class Usermodeladmin(admin.ModelAdmin):
    list_display = ['First_name','email','is_coreTeam',]
    search_fields = ['First_name',"email",'Last_name','email']
    list_filter = ['is_coreTeam']
    readonly_fields = (
        # 'phone_number',
        "email_token","SMS_token")
    class Meta:
        model= User

    def has_delete_permission(self, request, obj=None):
        return False
admin.site.register(User,Usermodeladmin)