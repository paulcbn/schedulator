from django.urls import path

from .views import SubjectAPI, DefaultSubjectsAPI, SectionAPI, FormationAPI, InitiateUserAPI

urlpatterns = [
    path("subjects/", SubjectAPI.as_view()),
    path("sections/<int:pk>/default-subjects/", DefaultSubjectsAPI.as_view()),
    path("sections/", SectionAPI.as_view()),
    path("formations/", FormationAPI.as_view()),
    path("initiate-user/", InitiateUserAPI.as_view()),
]
