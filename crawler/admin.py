from django.contrib import admin

from crawler.models import Subject, Section


@admin.register(Subject, Section)
class AuthorAdmin(admin.ModelAdmin):
    pass
