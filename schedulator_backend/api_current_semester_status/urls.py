from django.urls import path

from .views import CurrentSemesterStatusAPI

urlpatterns = [
    path("", CurrentSemesterStatusAPI.as_view()),
]
