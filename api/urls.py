from django.urls import path, include

from api.api.auth_api import RegistrationAPI, LoginAPI, UserAPI
from api.api.current_status_api import OwnAttendancesListAPI
from api.api.current_week_api import CurrentWeekAPI
from api.api.enrollment_state_api import OwnEnrollmentStateAPI, SubjectComponentStateAPI, OwnEnrollmentAPI, \
    NotOwnedSubjectAPI
from api.api.export_timetable_api import ExportTimetableApi
from api.api.initial_setup_api import SubjectAPI, DefaultSubjectsAPI, SectionAPI, FormationAPI, InitiateUserAPI
from api.api.static_tables_api import StaticTableAPI, FormationsStaticTableHierarchyAPI, SubjectStaticTableAPI, \
    TeacherStaticTableAPI

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

    # current week
    path("current-week/", CurrentWeekAPI.as_view()),

    # static tables
    path("static-tables/", StaticTableAPI.as_view()),
    path("formation-static-tables-hierarchy/", FormationsStaticTableHierarchyAPI.as_view()),
    path("subject-static-tables/", SubjectStaticTableAPI.as_view()),
    path("teacher-static-tables/", TeacherStaticTableAPI.as_view()),

    # enrollment state
    path("enrollments/", OwnEnrollmentAPI.as_view()),
    path("enrollments-state/", OwnEnrollmentStateAPI.as_view()),
    path("not-owned-subjects/", NotOwnedSubjectAPI.as_view()),
    path("subject-components/<int:subject_component_id>/attendances/", SubjectComponentStateAPI.as_view()),

    # export timetable
    path("export-own-timetable/", ExportTimetableApi.as_view()),
]
