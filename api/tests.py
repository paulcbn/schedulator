import datetime

import pytz
from django.test import TestCase

# Create your tests here.
from api.models import Semester, Vacation
from api.utils import is_vacation_week, get_school_week


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


class VacationTests(TestCase):
    def setUp(self) -> None:
        Vacation.objects.create(start_week=4, end_week=7)
        Vacation.objects.create(start_week=12, end_week=13)
        Vacation.objects.create(start_week=15, end_week=16)
        Semester.objects.create(start_date=datetime.datetime(year=2019, month=10, day=2, tzinfo=pytz.UTC), weeks=14)

    def test_valid_vacation_weeks(self):
        self.assertTrue(is_vacation_week(4))
        self.assertTrue(is_vacation_week(5))
        self.assertTrue(is_vacation_week(6))
        self.assertTrue(is_vacation_week(12))

    def test_invalid_vacation_weeks(self):
        self.assertFalse(is_vacation_week(-15))
        self.assertFalse(is_vacation_week(2))
        self.assertFalse(is_vacation_week(3))
        self.assertFalse(is_vacation_week(7))
        self.assertFalse(is_vacation_week(15))
        self.assertFalse(is_vacation_week(16))
        self.assertFalse(is_vacation_week(13))

    def test_get_school_week_in_school_period(self):
        self.assertEqual(get_school_week(1), 1)
        self.assertEqual(get_school_week(2), 2)
        self.assertEqual(get_school_week(3), 3)
        self.assertEqual(get_school_week(7), 4)
        self.assertEqual(get_school_week(8), 5)
        self.assertEqual(get_school_week(13), 9)
        self.assertEqual(get_school_week(14), 10)

    def test_get_school_week_in_vacation_period(self):
        self.assertEqual(get_school_week(4), 3)
        self.assertEqual(get_school_week(5), 3)
        self.assertEqual(get_school_week(12), 8)
        self.assertEqual(get_school_week(6), 3)

    def test_get_school_week_out_of_bounds(self):
        self.assertEqual(get_school_week(-2), 1)
        self.assertEqual(get_school_week(14), 10)
        self.assertEqual(get_school_week(15), 10)

