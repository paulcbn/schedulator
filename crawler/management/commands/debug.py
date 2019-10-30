from django.core.management.base import BaseCommand

from crawler.models import Section, Subject


class Command(BaseCommand):
    """Use this for debug stuff."""

    def handle(self, *args, **options):
        for x in Subject.objects.get(pk='MLR0024').subjectcomponent_set.all():
            print(x)
