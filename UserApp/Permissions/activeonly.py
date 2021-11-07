from rest_framework import permissions

class Activeonly(permissions.BasePermission):
    message = 'Adding customers not allowed.'


    def has_object_permission(self, request, view, obj):
        user = request.user
        # print(user,'kkkkkkkkkkkkkkkkkkkkkkkk',obj.id)
        if request.user.is_active:
            return False

