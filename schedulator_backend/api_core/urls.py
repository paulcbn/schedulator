from django.urls import path, include

urlpatterns = [
    path("auth/", include('scs_auth.urls')),
    path("reset-timetable/", include('api_reset_timetable.urls')),
    path("current-timetable/", include('api_current_timetable.urls')),
    path("current-semester-status/", include('api_current_semester_status.urls')),
    path("static-timetables/", include('api_static_timetables.urls')),
    path("enrollment-manager/", include('api_enrollment_manager.urls')),
    path("export-timetable/", include('api_export_timetable.urls')),
    path("custom-timetable-entries/", include('api_custom_timetable_entries.urls')),
]
