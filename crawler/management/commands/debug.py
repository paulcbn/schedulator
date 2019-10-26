from django.core.management.base import BaseCommand

from crawler.models import Section


class Command(BaseCommand):
    """Use this for debug stuff."""

    def handle(self, *args, **options):
        for subject in Section.objects.get(name='Informatica - in limba engleza', year='Anul 3').default_subjects.all():
            print(subject)
