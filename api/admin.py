from django.contrib import admin
from api.models import UserProfile
from crawler.admin import AttendanceChoiceInline, EnrolledSubjectInline


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    inlines = [EnrolledSubjectInline, AttendanceChoiceInline]
    exclude = ('enrolled_subjects', 'attendance_choices')
    list_select_related = ('user', 'user')

