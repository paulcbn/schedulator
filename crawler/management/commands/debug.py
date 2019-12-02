from django.core.management.base import BaseCommand

from api.services.static_table_service import get_static_tables_hierarchy
from crawler.models import Section, Subject


class Command(BaseCommand):
    """Use this for debug stuff."""

    def handle(self, *args, **options):
        x = get_static_tables_hierarchy(6)
