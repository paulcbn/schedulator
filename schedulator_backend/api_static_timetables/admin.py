from django.contrib import admin

from .models import StaticTable


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
    exclude = ('attendances', 'formations')
