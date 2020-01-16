import datetime

import pytz
from django.test import TestCase


from api.models import Semester, Vacation
from api.services.current_week_service import is_vacation_week, get_school_week


class SemesterDateTests(TestCase):
    def setUp(self) -> None:
        self.semester = Semester(start_date=datetime.datetime(year=2019, month=10, day=7), name="1")

    def test_semester_weeks_past_for_the_next_day(self):
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=10, day=12)), 1)
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=10, day=9)), 1)
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=5, day=4)), -22)
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=10, day=14)), 2)

    def test_semester_weeks_past_for_the_next_days(self):
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=10, day=11)), 1)
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=10, day=13)), 1)
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=10, day=14)), 2)

    def test_semester_weeks_past_for_the_next_week(self):
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=10, day=14)), 2)

        semester = Semester(start_date=datetime.datetime(year=2019, month=10, day=8), name="4")
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=10, day=20)), 2)

    def test_semester_weeks_past_for_the_next_months(self):
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=11, day=2)), 4)
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=11, day=11)), 6)
        self.assertEqual(self.semester.weeks_past(datetime.datetime(year=2019, month=11, day=17)), 6)


class VacationTests(TestCase):
    def setUp(self) -> None:
        semester = Semester.objects.create(
            start_date=datetime.datetime(year=2019, month=9, day=29, tzinfo=pytz.UTC),
            weeks=14
        )
        Vacation.objects.create(start_week=4, end_week=7, semester=semester)
        Vacation.objects.create(start_week=12, end_week=13, semester=semester)
        Vacation.objects.create(start_week=15, end_week=16, semester=semester)

    def test_valid_vacation_weeks(self):
        self.assertTrue(is_vacation_week(4))
        self.assertTrue(is_vacation_week(5))
        self.assertTrue(is_vacation_week(6))
        self.assertTrue(is_vacation_week(7))
        self.assertTrue(is_vacation_week(12))
        self.assertTrue(is_vacation_week(13))
        self.assertTrue(is_vacation_week(15))
        self.assertTrue(is_vacation_week(16))

    def test_invalid_vacation_weeks(self):
        self.assertFalse(is_vacation_week(-15))
        self.assertFalse(is_vacation_week(1))
        self.assertFalse(is_vacation_week(2))
        self.assertFalse(is_vacation_week(3))
        self.assertFalse(is_vacation_week(8))
        self.assertFalse(is_vacation_week(9))
        self.assertFalse(is_vacation_week(10))
        self.assertFalse(is_vacation_week(11))
        self.assertFalse(is_vacation_week(14))
        self.assertFalse(is_vacation_week(17))
        self.assertFalse(is_vacation_week(18))
        self.assertFalse(is_vacation_week(19))
        self.assertFalse(is_vacation_week(20))
        self.assertFalse(is_vacation_week(21))
        self.assertFalse(is_vacation_week(22))

    def test_get_school_week_in_school_period(self):
        self.assertEqual(get_school_week(1), 1)
        self.assertEqual(get_school_week(2), 2)
        self.assertEqual(get_school_week(3), 3)
        self.assertEqual(get_school_week(8), 4)
        self.assertEqual(get_school_week(9), 5)
        self.assertEqual(get_school_week(10), 6)
        self.assertEqual(get_school_week(11), 7)
        self.assertEqual(get_school_week(14), 8)
        self.assertEqual(get_school_week(17), 9)
        self.assertEqual(get_school_week(18), 10)
        self.assertEqual(get_school_week(19), 11)
        self.assertEqual(get_school_week(20), 12)
        self.assertEqual(get_school_week(21), 13)
        self.assertEqual(get_school_week(22), 14)

    def test_get_school_week_in_vacation_period(self):
        self.assertEqual(get_school_week(4), 3)
        self.assertEqual(get_school_week(5), 3)
        self.assertEqual(get_school_week(6), 3)
        self.assertEqual(get_school_week(7), 3)
        self.assertEqual(get_school_week(12), 7)
        self.assertEqual(get_school_week(13), 7)
        self.assertEqual(get_school_week(15), 8)
        self.assertEqual(get_school_week(16), 8)

    def test_get_school_week_out_of_bounds(self):
        self.assertEqual(get_school_week(-2), 1)
        self.assertEqual(get_school_week(23), 14)
        self.assertEqual(get_school_week(25), 14)
