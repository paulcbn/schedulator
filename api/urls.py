from django.urls import path, include

from api.api import RegistrationAPI, UserAPI, LoginAPI, SubjectAPI, DefaultSubjectsAPI

urlpatterns = [
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/user/", UserAPI.as_view()),
    path("auth/", include('knox.urls')),

    path("subjects/", SubjectAPI.as_view()),
    path("section/<int:pk>/subjects/", DefaultSubjectsAPI.as_view()),
]
