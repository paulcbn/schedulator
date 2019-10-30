from django.contrib import admin

from crawler.models import Subject, Section, SubjectComponent, Formation


@admin.register(Subject, Section, SubjectComponent, Formation)
class AuthorAdmin(admin.ModelAdmin):
    pass
