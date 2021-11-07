from rest_framework import permissions

class coreuseronly(permissions.BasePermission):
    message = 'Adding customers not allowed.'

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            if request.user.is_anonymous:
                return False
            if request.user.is_developer:
                return True
            if request.user.is_coreTeam:
                return True



