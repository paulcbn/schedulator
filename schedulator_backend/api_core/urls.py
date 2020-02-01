from django.urls import path, include

from api_core.api.custom_entries_api import PersonalTableEntryListCreateAPI, PersonalTableEntryDestroyAPI


urlpatterns = [

    path("auth/", include('scs_auth.urls')),
    path("reset-timetable/", include('api_reset_timetable.urls')),
    path("current-timetable/", include('api_current_timetable.urls')),
    path("current-semester-status/", include('api_current_semester_status.urls')),
    path("static-timetables/", include('api_static_timetables.urls')),
    path("enrollment-manager/", include('api_enrollment_manager.urls')),
    path("export-timetable/", include('api_export_timetable.urls')),

    # personal timetable entries
    path("personal-timetable-entries/", PersonalTableEntryListCreateAPI.as_view()),
    path("personal-timetable-entries/<int:pk>/", PersonalTableEntryDestroyAPI.as_view()),
]
