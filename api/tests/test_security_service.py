from django.contrib.auth.models import User
from django.test import TestCase

from api.services.security_service import user_owns_entries
from crawler.models import TimetableEntry, Formation, Section, Room, Subject, SubjectComponent


class UserOwnsAttendanceTest(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='testuser1', password='12345').user_profile
        self.user2 = User.objects.create_user(username='testuser2', password='12345').user_profile
        self.user3 = User.objects.create_user(username='testuser3', password='12345').user_profile
        self.user4 = User.objects.create_user(username='testuser4', password='12345').user_profile

        self.section = Section.objects.create(name="section", year="year")
        self.formation = Formation.objects.create(name="formation", section=self.section)
        self.room = Room.objects.create(name="room", description="")
        self.subject = Subject.objects.create(sid="sid", name="subject")
        self.subject_comp = SubjectComponent.objects.create(name="component", subject=self.subject)

        self.timetable_entry1 = TimetableEntry.objects.create(
            id=1,
            start_time='12:00',
            end_time='13:00',
            formation=self.formation,
            room=self.room,
            frequency=TimetableEntry.ALL_WEEKS,
            week_day=TimetableEntry.MONDAY,
            teacher='teacher',
            subject_component=self.subject_comp
        )
        self.timetable_entry2 = TimetableEntry.objects.create(
            id=2,
            start_time='13:00',
            end_time='14:00',
            formation=self.formation,
            room=self.room,
            frequency=TimetableEntry.ALL_WEEKS,
            week_day=TimetableEntry.MONDAY,
            teacher='teacher',
            subject_component=self.subject_comp
        )

        self.user1.attendance_choices.set([self.timetable_entry1, self.timetable_entry2])
        self.user1.save()

        self.user2.attendance_choices.set([self.timetable_entry1])
        self.user2.save()

        self.user3.attendance_choices.set([self.timetable_entry1, self.timetable_entry1])
        self.user3.save()

    def test_usual_true(self):
        self.assertTrue(user_owns_entries(self.user1.user, [1, 2]))

    def test_only_one(self):
        self.assertTrue(user_owns_entries(self.user2.user, [1]))

    def test_usual_false(self):
        self.assertFalse(user_owns_entries(self.user1.user, [3]))

    def test_one_false(self):
        self.assertFalse(user_owns_entries(self.user1.user, [1, 3]))

    def test_many_of_the_same_entry(self):
        self.assertTrue(user_owns_entries(self.user3.user, [1, 1, 1]))

    def test_user_owns_none(self):
        self.assertFalse(user_owns_entries(self.user4.user, [1]))
