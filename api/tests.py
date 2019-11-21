import datetime

from django.test import TestCase

# Create your tests here.
from api.models import Semester


class SemesterDateTests(TestCase):
    def test_semester_weeks_past_for_the_next_day(self):
        # semester starts friday
        semester = Semester(start_date=datetime.datetime(year=2019, month=10, day=11), name="1")
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=10, day=12)), 1)
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=10, day=9)), 1)
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=5, day=4)), -22)

        # semester starts sunday
        semester = Semester(start_date=datetime.datetime(year=2019, month=10, day=13), name="2")
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=10, day=14)), 2)

    def test_semester_weeks_past_for_the_next_days(self):
        # semester starts wednesday
        semester = Semester(start_date=datetime.datetime(year=2019, month=10, day=9), name="3")
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=10, day=11)), 1)
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=10, day=13)), 1)
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=10, day=14)), 2)

    def test_semester_weeks_past_for_the_next_week(self):
        # semester starts tuesday
        semester = Semester(start_date=datetime.datetime(year=2019, month=10, day=8), name="3")
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=10, day=14)), 2)
        # 6 days difference but not in the same week

        # semester starts tuesday
        semester = Semester(start_date=datetime.datetime(year=2019, month=10, day=8), name="4")
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=10, day=20)), 2)
        # 12 days difference

    def test_semester_weeks_past_for_the_next_months(self):
        # semester starts friday
        semester = Semester(start_date=datetime.datetime(year=2019, month=10, day=11), name="1")
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=11, day=2)), 4)
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=11, day=11)), 6)
        self.assertEqual(semester.weeks_past(datetime.datetime(year=2019, month=11, day=17)), 6)
