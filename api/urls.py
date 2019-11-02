from django.urls import path, include

from api.api import RegistrationAPI, UserAPI, LoginAPI, SubjectAPI

urlpatterns = [
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/user/", UserAPI.as_view()),
    path("auth/", include('knox.urls')),

    path("subjects/", SubjectAPI.as_view())
]
