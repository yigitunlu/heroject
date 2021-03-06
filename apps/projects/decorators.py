from django.shortcuts import redirect, get_object_or_404
from functools import wraps
from apps.projects.models import Task, Project, Discussion


def has_access_project(redirect_url=None, klass=None):
    def decorator(function):
        def _control(request, pk=None,  *args, **kwargs):
            if klass:
                id_key = klass.__name__.lower() + '_id'

            pk = pk or kwargs.get(id_key)

            object = get_object_or_404(klass, pk=pk)

            if klass == Project:
                if object not in request.user.projects:
                    return redirect(redirect_url)

            elif klass == Task or klass == Discussion:
                if object.project not in request.user.projects:
                    return redirect(redirect_url)

            return function(request, pk, object, *args, **kwargs)
        return wraps(function)(_control)
    return decorator