from django.contrib import admin

from api_custom_timetable_entries.models import CustomTimetableEntry


@admin.register(CustomTimetableEntry)
class CustomTimetableEntryAdmin(admin.ModelAdmin):
    pass
