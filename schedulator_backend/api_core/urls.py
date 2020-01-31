from django.urls import path, include

from api_core.api.custom_entries_api import PersonalTableEntryListCreateAPI, PersonalTableEntryDestroyAPI
from api_core.api.enrollment_state_api import OwnEnrollmentStateAPI, SubjectComponentStateAPI, OwnEnrollmentAPI, \
    NotOwnedSubjectAPI, OwnAttendancesCreateDestroyAPI
from api_core.api.export_timetable_api import ExportTimetableApi
from api_core.api.static_tables_api import StaticTableAPI, FormationsStaticTableHierarchyAPI, SubjectStaticTableAPI, \
    TeacherStaticTableAPI, SectionAPI

urlpatterns = [

    path("auth/", include('scs_auth.urls')),
    path("reset-timetable/", include('api_reset_timetable.urls')),
    path("current-timetable/", include('api_current_timetable.urls')),
    path("current-semester-status/", include('api_current_semester_status.urls')),

    # static tables
    path("static-tables/", StaticTableAPI.as_view()),
    path("static-tables/sections/", SectionAPI.as_view()),
    path("formation-static-tables-hierarchy/", FormationsStaticTableHierarchyAPI.as_view()),
    path("subject-static-tables/", SubjectStaticTableAPI.as_view()),
    path("teacher-static-tables/", TeacherStaticTableAPI.as_view()),

    # enrollment state
    path("enrollment-state/attendances/", OwnAttendancesCreateDestroyAPI.as_view()),

    path("enrollments/", OwnEnrollmentAPI.as_view()),
    path("enrollments-state/", OwnEnrollmentStateAPI.as_view()),
    path("not-owned-subjects/", NotOwnedSubjectAPI.as_view()),
    path("subject-components/<int:subject_component_id>/attendances/", SubjectComponentStateAPI.as_view()),

    # export timetable
    path("export-own-timetable/", ExportTimetableApi.as_view()),

    # personal timetable entries
    path("personal-timetable-entries/", PersonalTableEntryListCreateAPI.as_view()),
    path("personal-timetable-entries/<int:pk>/", PersonalTableEntryDestroyAPI.as_view()),
]
