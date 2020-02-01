from django.urls import path

from .views import StaticTableAPI, SectionAPI, FormationsStaticTableHierarchyAPI, SubjectStaticTableAPI, \
    TeacherStaticTableAPI

urlpatterns = [
    path("", StaticTableAPI.as_view()),
    path("sections/", SectionAPI.as_view()),
    path("formation-static-timetables-hierarchy/", FormationsStaticTableHierarchyAPI.as_view()),
    path("subject-static-timetables/", SubjectStaticTableAPI.as_view()),
    path("teacher-static-timetables/", TeacherStaticTableAPI.as_view()),
]
