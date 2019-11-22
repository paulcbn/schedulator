from django.contrib import admin
from api.models import UserProfile, Semester, Vacation
from crawler.admin import AttendanceChoiceInline, EnrolledSubjectInline


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    inlines = [EnrolledSubjectInline, AttendanceChoiceInline]
    exclude = ('enrolled_subjects', 'attendance_choices')
    list_select_related = ('user', 'user')


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    pass


@admin.register(Vacation)
class VacationAdmin(admin.ModelAdmin):
    list_display = ['start_week', 'end_week', 'name', 'semester']
