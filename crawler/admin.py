from django.contrib import admin

from api.models import UserProfile
from crawler.models import Subject, Section, SubjectComponent, Formation, TimetableEntry


class EnrolledSubjectInline(admin.TabularInline):
    verbose_name_plural = 'Enrolled Subjects'
    verbose_name = 'Enrolled Subject'
    model = UserProfile.enrolled_subjects.through
    extra = 0
    template = "crawler/custom_tabular_inline.html"

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'sid')
    search_fields = ('name', 'sid')
    inlines = [EnrolledSubjectInline, ]


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    search_fields = ('year', 'name', 'type')
    list_display = ('name', 'year', 'type')


@admin.register(SubjectComponent)
class SubjectComponentAdmin(admin.ModelAdmin):
    list_display = ('subject', 'name')
    search_fields = ('subject__name', 'name')
    list_select_related = ('subject', 'subject')


@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    search_fields = ('section__name', 'section__year', 'name')
    list_display = ('name', 'section')
    list_select_related = ('section', 'section')


class AttendanceChoiceInline(admin.TabularInline):
    verbose_name_plural = 'Timetable  Entries'
    verbose_name = 'Timetable Entry'
    model = UserProfile.attendance_choices.through
    extra = 0
    template = "crawler/custom_tabular_inline.html"

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(TimetableEntry)
class TimetableEntryAdmin(admin.ModelAdmin):
    search_fields = ('subject_component__subject__name', 'subject_component__name', 'formation__name', 'room__name')
    list_display = (
        'week_day',
        'start_time',
        'end_time',
        'frequency',
        'room',
        'subject_component',
        'formation',
        'teacher',
    )
    list_select_related = ['subject_component', 'subject_component']
    inlines = [AttendanceChoiceInline, ]

    def get_form(self, request, obj=None, change=False, **kwargs):
        request._obj_ = obj
        return super().get_form(request, obj, **kwargs)
