from crawler.models import Subject, TimetableEntry


class InitialSetupService:
    def __init__(self, user):
        self._user = user

    def _reset_user_data(self):
        self._user.user_profile.enrolled_subjects.clear()
        self._user.user_profile.attendance_choices.clear()

    def _enroll(self, subject_ids):
        for subject_id in subject_ids:
            self._user.user_profile.enrolled_subjects.add(Subject.objects.get(sid=subject_id))

    def _attend(self, subject_ids, formation_names):
        timetables_entries = TimetableEntry.objects.filter(subject_component__subject_id__in=subject_ids) \
            .filter(formation__name__in=formation_names).all()
        self._user.user_profile.attendance_choices.add(*timetables_entries.all())

    def initiate(self, subject_ids, formation_names):
        self._reset_user_data()
        self._enroll(subject_ids)
        self._attend(subject_ids, formation_names)
