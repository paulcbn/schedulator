from django.urls import path

from .views import OwnAttendancesListAPI

urlpatterns = [
    path("attendances/", OwnAttendancesListAPI.as_view()),
]
