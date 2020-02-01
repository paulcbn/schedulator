from django.urls import path

from .views import CustomTimetableEntryListCreateAPI, CustomTimetableEntryDestroyAPI

urlpatterns = [
    path("", CustomTimetableEntryListCreateAPI.as_view()),
    path("<int:pk>/", CustomTimetableEntryDestroyAPI.as_view()),
]
