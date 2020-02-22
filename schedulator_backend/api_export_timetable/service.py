import datetime

import pytz
from django.utils import timezone
from ics import Calendar, Event
from ics.parse import ContentLine

from api_core.models import Semester, Vacation
from api_current_semester_status.service import get_week_for_date
from crawler.models import TimetableEntry

days_mapper = {
    TimetableEntry.MONDAY: 0,
    TimetableEntry.TUESDAY: 1,
    TimetableEntry.WEDNESDAY: 2,
    TimetableEntry.THURSDAY: 3,
    TimetableEntry.FRIDAY: 4,
    TimetableEntry.SATURDAY: 5,
    TimetableEntry.SUNDAY: 6,
}


def format_date_time(date):
    return date.strftime("%Y%m%dT%H%M%S")


def map_week_day_to_date(monday_date, weekday):
    days_count = days_mapper.get(weekday, 0)
    return monday_date + datetime.timedelta(days=days_count)


def localized(date):
    return timezone.localtime(date, pytz.timezone('Europe/Bucharest'))


def add_time(date, time):
    return date + datetime.timedelta(hours=time.hour, minutes=time.minute)


def should_create_event(timetable_entry, interval):
    start_date, end_date = interval
    count = (end_date - start_date).days // 7
    if count >= 2:
        return True

    week_parity = get_week_for_date(start_date) % 2
    if timetable_entry.frequency == TimetableEntry.ODD_WEEKS and week_parity == 0:
        return False
    if timetable_entry.frequency == TimetableEntry.EVEN_WEEKS and week_parity == 1:
        return False
    return True


def apply_frequency(day, freq, interval):
    start_date, end_date = interval
    count = (end_date - start_date).days // 7
    if freq == TimetableEntry.ALL_WEEKS:
        return day, count, ''

    week_parity = get_week_for_date(start_date) % 2

    ics_interval = 'INTERVAL=2;'
    if week_parity == 0:
        if freq == TimetableEntry.EVEN_WEEKS:
            return day, (count + 1) // 2, ics_interval
        else:
            day += datetime.timedelta(weeks=1)
            return day, count // 2, ics_interval
    else:
        if freq == TimetableEntry.ODD_WEEKS:
            return day, (count + 1) // 2, ics_interval
        else:
            day += datetime.timedelta(weeks=1)
            return day, count // 2, ics_interval


def create_event(timetable_entry, interval):
    start_date, _ = interval

    e = Event()
    e.name = timetable_entry.subject_component.subject.name
    e.description = f'{timetable_entry.subject_component.name} ({timetable_entry.formation.name})'
    e.location = timetable_entry.room.name

    day = map_week_day_to_date(start_date, timetable_entry.week_day)
    day, week_count, ics_interval = apply_frequency(day, timetable_entry.frequency, interval)
    e.extra.append(ContentLine(name='RRULE', value=f'FREQ=WEEKLY;{ics_interval}COUNT={week_count}'))
    e.extra.append(ContentLine(name='DTSTART',
                               params={'TZID': ('Europe/Bucharest',)},
                               value=format_date_time(add_time(day, timetable_entry.start_time))))
    e.extra.append(ContentLine(name='DTEND',
                               params={'TZID': ('Europe/Bucharest',)},
                               value=format_date_time(add_time(day, timetable_entry.end_time))))
    return e


def generate_semester_intervals():
    semester = Semester.objects.order_by('-start_date').first()
    vacations = Vacation.objects.filter(semester=semester)
    semester_start = localized(semester.start_date)
    start_date = localized(semester.start_date)
    result = []

    total_vacation_length = 0
    for vacation in vacations:
        total_vacation_length += len(vacation)
        end_date = semester_start + datetime.timedelta(weeks=vacation.start_week - 1)
        result.append((start_date, end_date))
        start_date = semester_start + datetime.timedelta(weeks=vacation.end_week)

    end_date = semester_start + datetime.timedelta(weeks=semester.weeks + total_vacation_length)
    result.append((start_date, end_date))

    return result


def generate_export(user):
    c = Calendar()

    semester_intervals = generate_semester_intervals()
    for timetable_entry in user.user_profile.attendance_choices.all():
        for interval in semester_intervals:
            if should_create_event(timetable_entry, interval):
                e = create_event(timetable_entry, interval)
                c.events.add(e)
    return str(c)
