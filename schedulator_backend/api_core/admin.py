from django.contrib import admin
from api_core.models import UserProfile, Semester, Vacation, StaticTable
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


class StaticTableAttendancesInline(admin.TabularInline):
    template = "crawler/custom_tabular_inline.html"
    model = StaticTable.attendances.through
    extra = 0
    verbose_name = "Attendance"

    def has_change_permission(self, request, obj=None):
        return False


class StaticTableFormationsInline(admin.TabularInline):
    template = "crawler/custom_tabular_inline.html"
    model = StaticTable.formations.through
    extra = 0
    verbose_name = "Formation"

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(StaticTable)
class StaticTableAdmin(admin.ModelAdmin):
    list_select_related = ('section', 'section')
    inlines = [StaticTableAttendancesInline, StaticTableFormationsInline]
    exclude = ('attendances','formations')
