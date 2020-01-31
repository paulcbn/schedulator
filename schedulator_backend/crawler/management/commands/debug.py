import functools
import time

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import connection, reset_queries

from api_core.services.export_timetable_service import generate_export


def debugger_queries(func):
    """Basic function to debug queries."""

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("func: ", func.__name__)
        reset_queries()

        start = time.time()
        start_queries = len(connection.queries)

        result = func(*args, **kwargs)

        end = time.time()
        end_queries = len(connection.queries)

        print("queries:", end_queries - start_queries)
        print("took: %.2fs" % (end - start))
        return result

    return wrapper


class Command(BaseCommand):
    """Use this for debug stuff."""

    @debugger_queries
    def handle(self, *args, **options):
        admin_usr = User.objects.get(username='admin')
        print(generate_export(admin_usr))
