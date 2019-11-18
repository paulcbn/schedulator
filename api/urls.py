from django.urls import path, include

from api.api import RegistrationAPI, UserAPI, LoginAPI, SubjectAPI, DefaultSubjectsAPI, SectionAPI, FormationAPI, \
    InitiateUserAPI

urlpatterns = [
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/user/", UserAPI.as_view()),
    path("auth/", include('knox.urls')),

    path("subjects/", SubjectAPI.as_view()),
    path("sections/<int:pk>/default-subjects/", DefaultSubjectsAPI.as_view()),
    path("sections/", SectionAPI.as_view()),
    path("formations/", FormationAPI.as_view()),
    path("initiate-user/", InitiateUserAPI.as_view()),
]
