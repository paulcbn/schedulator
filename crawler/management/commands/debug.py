import functools
import time

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import reset_queries, connection

from api.serializers.enrollment_state_serializers import EnrolledSubjectSerializer
from api.services.enrollment_state_service import get_enrolled_for_user, get_entries_for_subject_component, \
    search_not_owned_subjects_paged


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
        result = search_not_owned_subjects_paged('a  ', 2)
        print(result)
