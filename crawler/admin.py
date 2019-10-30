from django.contrib import admin

from crawler.models import Subject, Section, SubjectComponent, Formation


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'sid')
    search_fields = ('name', 'sid')


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
