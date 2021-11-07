from rest_framework import permissions

class Readonly(permissions.BasePermission):
    message = 'Adding customers not allowed.'


    def has_object_permission(self, request, view, obj):
        user = request.user
        # print(user,'kkkkkkkkkkkkkkkkkkkkkkkk',obj.id)
        if request.user.is_anonymous:
            return False
        if obj.id == user.id:
            return True
        if user.is_developer:
            return True
        if user.is_coreTeam:
            return True