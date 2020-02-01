from api_core.models import UserProfile


def user_owns_entries(user, entry_ids):
    entry_set = set(entry_ids)
    user_profile = UserProfile.objects.prefetch_related('attendance_choices').get(user=user)
    return user_profile.attendance_choices.filter(id__in=entry_set).count() == len(entry_set)


def user_is_enrolled_to_subjects(user, subject_ids):
    subject_set = set(subject_ids)
    user_profile = UserProfile.objects.prefetch_related('enrolled_subjects').get(user=user)
    return user_profile.enrolled_subjects.filter(sid__in=subject_set).count() == len(subject_set)
