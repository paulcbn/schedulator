from django.urls import path

from .views import OwnAttendancesCreateDestroyAPI, OwnEnrollmentCreateDestroyAPI, OwnEnrollmentStateRetrieveAPI, \
    NotOwnedSubjectRetrieveAPI, SubjectComponentStateRetrieveAPI

urlpatterns = [
    path("attendances/", OwnAttendancesCreateDestroyAPI.as_view()),
    path("enrollments/", OwnEnrollmentCreateDestroyAPI.as_view()),
    path("enrollments-state/", OwnEnrollmentStateRetrieveAPI.as_view()),
    path("not-owned-subjects/", NotOwnedSubjectRetrieveAPI.as_view()),
    path("subject-components/<int:subject_component_id>/attendances/", SubjectComponentStateRetrieveAPI.as_view()),
]
