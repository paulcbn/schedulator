from django.urls import path, include

from api.api.auth_api import RegistrationAPI, LoginAPI, UserAPI
from api.api.current_status_api import OwnAttendancesListAPI, CurrentWeekAPI, OwnEnrollmentsListAPI
from api.api.enrollment_state_api import EnrollmentStateAPI, SubjectComponentStateAPI
from api.api.initial_setup_api import SubjectAPI, DefaultSubjectsAPI, SectionAPI, FormationAPI, InitiateUserAPI
from api.api.static_tables_api import StaticTableAPI, StaticTableHierarchyAPI

urlpatterns = [
    # auth:
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/user/", UserAPI.as_view()),
    path("auth/", include('knox.urls')),

    # initial setup:
    path("subjects/", SubjectAPI.as_view()),
    path("sections/<int:pk>/default-subjects/", DefaultSubjectsAPI.as_view()),
    path("sections/", SectionAPI.as_view()),
    path("formations/", FormationAPI.as_view()),
    path("initiate-user/", InitiateUserAPI.as_view()),

    # current status
    path("attendances/", OwnAttendancesListAPI.as_view()),
    path("enrollments/", OwnEnrollmentsListAPI.as_view()),
    path("current-week/", CurrentWeekAPI.as_view()),

    # static tables
    path("static-tables/", StaticTableAPI.as_view()),
    path("static-tables-hierarchy/", StaticTableHierarchyAPI.as_view()),

    # enrollment state
    path("enrollments-state/", EnrollmentStateAPI.as_view()),
    path("subject-components/<int:subject_component_id>/attendances/", SubjectComponentStateAPI.as_view()),

]
