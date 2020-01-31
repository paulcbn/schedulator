import operator
from functools import reduce

from django.contrib.auth.models import User
from django.core.paginator import Paginator
from django.db.models import Prefetch, Q

from api_core.models import UserProfile
from crawler.models import TimetableEntry, SubjectComponent, Subject


def get_enrolled_for_user(user):
    prefetch_subject_components = Prefetch("enrolled_subjects__subjectcomponent_set")
    prefetch_section = Prefetch("enrolled_subjects__section_set")
    prefetch_timetable_entries = Prefetch("enrolled_subjects__subjectcomponent_set__timetableentry_set",
                                          queryset=UserProfile.objects.get(user=user).attendance_choices.all(),
                                          to_attr="own_entries")
    prefetch_formations = Prefetch("enrolled_subjects__subjectcomponent_set__own_entries__formation")
    prefetch_room = Prefetch("enrolled_subjects__subjectcomponent_set__own_entries__room")

    query = UserProfile.objects.prefetch_related(prefetch_subject_components,
                                                 prefetch_section,
                                                 prefetch_timetable_entries,
                                                 prefetch_formations,
                                                 prefetch_room)
    return query.get(user=user).enrolled_subjects


def get_entries_for_subject_component(user, subject_comp_id):
    subject_comp = SubjectComponent.objects.get(id=subject_comp_id)
    owned = UserProfile.objects.get(user=user).attendance_choices \
        .select_related("subject_component__subject", "formation", "room") \
        .filter(subject_component_id=subject_comp_id)

    all_ = TimetableEntry.objects \
        .select_related("subject_component__subject", "formation", "room") \
        .filter(subject_component_id=subject_comp_id)

    not_owned = all_.difference(owned)
    return {"owned": owned, "not_owned": not_owned, "subject_component": subject_comp}


def add_entries_for_user(user: User, entry_ids):
    entries = TimetableEntry.objects.filter(id__in=entry_ids)
    user.user_profile.attendance_choices.add(*entries)
    user.user_profile.save()


def add_enrollments_for_user(user, subject_ids):
    subjects = Subject.objects.filter(sid__in=subject_ids)
    user.user_profile.enrolled_subjects.add(*subjects)
    user.user_profile.save()


def remove_attendance_from_user(user, entry_id):
    entry = TimetableEntry.objects.get(pk=entry_id)
    user.user_profile.attendance_choices.remove(entry)


def remove_enrollment_from_user(user, subject_id):
    subject = Subject.objects.get(pk=subject_id)
    entries = user.user_profile.attendance_choices.all().filter(subject_component__subject=subject)
    user.user_profile.attendance_choices.remove(*entries)
    user.user_profile.enrolled_subjects.remove(subject)


def search_not_owned_subjects_paged(user, search_string, page_index):
    fields = search_string.split()

    owned = user.user_profile.enrolled_subjects.all()

    query = Q()
    query = reduce(operator.and_, map(lambda field: Q(name__icontains=field), fields), query)
    query = reduce(operator.or_, map(lambda field: Q(alias__iexact=field), fields), query)
    query_set = Subject.objects.filter(query).prefetch_related('section_set').difference(owned).order_by('name')
    paginator = Paginator(query_set, 5)

    return {'current_page': page_index, 'page_count': paginator.num_pages,
            'subjects': paginator.get_page(page_index).object_list}
