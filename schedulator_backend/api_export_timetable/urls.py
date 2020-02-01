from django.urls import path

from .views import ExportTimetableApi

urlpatterns = [
    path("export-own-timetable/", ExportTimetableApi.as_view()),
]
